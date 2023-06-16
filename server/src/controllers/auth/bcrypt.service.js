const bcrypt = require('bcrypt');

const { CONFIG } = require('../../config');
const { CustomException } = require('../../utils');
const { ErrorCodes, ErrorMessages } = require('../../constants');


class BcryptService {
  // Private field
  #_saltOrRounds;

  constructor() {
    this.saltOrRounds = parseInt(CONFIG.SALT || '10');
  }

  async compare(password, hashPassword) {
    try {
      return await bcrypt.compare(password, hashPassword);
    } catch (err) {
      console.log(err);

      throw new CustomException(
        err.message || ErrorMessages.SomethingWentWrong,
        err.code || ErrorCodes.Default,
      );
    }
  }

  async hash(password, saltOrRounds = this.#_saltOrRounds) {
    try {
      return await bcrypt.hash(password, saltOrRounds);
    } catch (err) {
      console.log(err);

      throw new CustomException(
        err.message || ErrorMessages.SomethingWentWrong,
        err.code || ErrorCodes.Default,
      );
    }
  }
}

module.exports = { BcryptService };
