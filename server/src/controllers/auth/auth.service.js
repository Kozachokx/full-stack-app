const {v4: uuid } = require('uuid');

const { UserService } = require('../user/user.service');
const { User } = require('../../database');
const { BadRequestException, CustomException, UnauthorizedException, NotFoundException } = require('../../utils');
const { EntityFields: { UserFields }, ErrorCodes, ErrorMessages, ErrorStatus } = require('../../constants');
const { JwtService } = require('./jwt.service');
const { BcryptService } = require('./bcrypt.service');


class AuthService {
  #_secret;
  #_saltOrRounds;

  constructor() {
    this.bcryptService = new BcryptService();
    this.userService = new UserService();
    this.jwtService = new JwtService();
    this.userRepository = User;
  }

  // private
  async #findOneByUsername(username, includeFields) {
    try {
      const includeOpt = {};
      if (includeFields) {
        if (typeof includeFields === 'string') {
          includeFields[`${includeFields}`] = true;
        } else {
          includeFields.forEach(field => {
            includeOpt[`${field}`] = true;
          });
        }
      }

      const user = await this.userRepository.findOne({ username }, includeOpt);

      return user;
    } catch (err) {
      console.log(err);

      throw new CustomException(
        err.message || ErrorMessages.SomethingWentWrong,
        err.code || ErrorCodes.Default,
      );
    }
  }

  async login({ username, password }) {
    try {
      const user = await this.#findOneByUsername(
        username.toLowerCase(),
        [UserFields.username, UserFields.password, UserFields.id, UserFields.isAdmin]
      );
  
      if (!user) throw new NotFoundException('User not found!');

      const isMatch = await this.bcryptService.compare(password, user.password);
      if (!isMatch) throw new BadRequestException('Invalid credentials');

      const accessToken = this.jwtService.generateAccessToken(user);
      const refreshToken = this.jwtService.generateRefreshToken(user.id);
  
      return {
        accessToken,
        refreshToken,
      };
    } catch (err) {
      console.log(err);

      throw new CustomException(
        err.message || ErrorMessages.SomethingWentWrong,
        err.code || ErrorCodes.Default,
      );
    }
  }

  async refresh(refreshToken) {
    try {
      if (!refreshToken) throw new UnauthorizedException();

      const payload = this.jwtService.verifyRefreshToken(refreshToken);

      // console.log('Payload :');
      // console.log(payload);
      // console.log(' ');

      if (!payload) throw new CustomException(
        ErrorMessages.Forbiden,
        ErrorCodes.Forbiden,
        ErrorStatus.Forbidden
      );

      const user = await this.userRepository.find({ id: payload.user.id }, { username: true });

      if (!user) throw new UnauthorizedException();

      const accessToken = this.jwtService.generateAccessToken({ username: user.username, id: user.id });

      return {
        user: payload.user.id,
        accessToken,
        refreshToken,
      };
    } catch (err) {
      console.log(err);

      throw new CustomException(
        err.message || ErrorMessages.SomethingWentWrong,
        err.code || ErrorCodes.RefreshToken,
      );
    }
  }

  async logout(accessToken) {
    try {
      console.log('Log out !!!', accessToken);

      return { accessToken };
    } catch (err) {
      console.log(err);

      throw new CustomException(
        err.message || ErrorMessages.SomethingWentWrong,
        err.code || ErrorCodes.Default,
      );
    }
  }

  async signUp(params) {
    try {
      const { email, password, ...restParams } = params;
      const username = params.username.toLowerCase();

      const exists = await this.#findOneByUsername(
        username
      );

      if (exists) throw new CustomException(
        'User with this username already exists!',
        ErrorCodes.Duplicate,
        ErrorStatus.Conflict
      );

      const userParams = {
        ...restParams,
        username,
        id: uuid(),
        password: await this.bcryptService.hash(password),
      };
      if (email) userParams.email = email.toLowerCase();
  
      return await this.userService.isAdmin(userParams);
    } catch (err) {
      console.log(err);

      throw new CustomException(
        err.message || ErrorMessages.SomethingWentWrong,
        err.code || ErrorCodes.Default,
      );
    }
  }



}

module.exports = { AuthService };
