const { User, Note } = require('../../database');
const { CustomException, ErrorMessages, ErrorCodes, BadRequestException } = require('../../utils');

class UserService {
  #_secret;

  constructor() {
    this.#_secret = 'secret';
    this.userRepository = User;
    this.noteRepository = Note;
  }

  async createUser(params) {
    try {
      const user = await this.userRepository.create(params);

      if (!user) throw new CustomException('Invalid user data received');

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
    console.log('id: ', id);
    const user = await this.userRepository.findOne({ id });
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

      // Delete all user Notes

      const updatedUser = {}

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
