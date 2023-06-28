const { User, Note } = require('../../database');
const { CustomException, ErrorMessages, ErrorCodes, BadRequestException, ErrorStatus, NotFoundException } = require('../../utils');

class UserService {
  #_secret;
  #_anonPassword;

  constructor() {
    this.#_secret = 'secret';
    this.#_anonPassword = 'magicPassword';
    this.userRepository = User;
    this.noteRepository = Note;

    this.#initialize().then();
  }

  // Private function
  async #createAnonymUserIfNotExists() {
    const exists = await this.userRepository.findOne({
      username: 'anonymous',
    });

    if (!exists) {
      await this.createUser({
        username: 'anonymous',
        password: this.#_anonPassword,
        firstName: 'Anonymous',
        lastName: 'User',
        email: 'some.from.env@gmail.com',
      });

      console.log('Anonymous user has been created.');
    }
  }
 
  async getAnonymUser() {
    return await this.userRepository.findOne({
      username: 'anonymous',
    });
  }

  async #initialize() {
    try {
      await this.#createAnonymUserIfNotExists();      
    } catch (err) {
      console.log('Error during user initialize. Error: ', err);

      throw new CustomException(
        err.message || ErrorMessages.SomethingWentWrong,
        err.message || ErrorCodes.UserInitialize,
        err.status || ErrorStatus.InternalServerError,
      );
    }
  }

  async isAdmin(id) {
    try {
      if (!id) throw new CustomException(`[isAdmin] Invalid user id received. Received id '${id}'.`);

      const user = await this.userRepository.find({ id: `${id}` });

      if (!user) throw new NotFoundException('User not found!');

      return !!user.isAdmin; 
    } catch (err) {
      console.log('[isAdmin] Error: ', err);

      throw new CustomException(
        err.message || ErrorMessages.SomethingWentWrong,
        err.code || ErrorCodes.Default,
      );
    }
  }

  async createUser(params) {
    try {
      const user = await this.userRepository.create(params);

      if (!user) throw new CustomException('[createUser] Invalid user data received');

      return { user }; 
    } catch (err) {
      console.log(err);

      throw new CustomException(
        err.message || ErrorMessages.SomethingWentWrong,
        err.code || ErrorCodes.Default,
      );
    }
  }

  async getUserById (id) {
    if (!id) throw new BadRequestException('Not provided user.id!');

    const user = await this.userRepository.findOne(
      { id },
      { 
        password: false,
        __v: false,
        // _id: false
      }
    );

    if (!user) throw new Error('User not found');
    
    return { user };
  }

  async getAll () {
    const users = await this.userRepository.find();
    
    return users;
  }

  async updateUser(accountId, userParams) {
    try {
      const user = await this.userRepository.findOne({ id: userParams.id });

      if(!user) throw new BadRequestException('User not found!');

      // TODO: Add logic

      const updatedUser = {};

      return updatedUser; 
    } catch (err) {
      console.log(err);

      throw new CustomException(
        err.message || ErrorMessages.SomethingWentWrong,
        err.code || ErrorCodes.Default,
      );
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.userRepository.findOne({ id });

      if(!user) throw new BadRequestException('User not found!');

      // Delete all user Notes
      await this.noteRepository.deleteMany({ user: user._id });

      const result = await user.deleteOne();

      return {
        message: `User '${result.username}' with ID '${result.id}' has been deleted.`
      }; 
    } catch (err) {
      console.log(err);

      throw new CustomException(
        err.message || ErrorMessages.SomethingWentWrong,
        err.code || ErrorCodes.Default,
      );
    }
  }
}

module.exports = { UserService };
