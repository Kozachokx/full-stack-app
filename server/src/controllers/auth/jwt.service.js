const jwt = require('jsonwebtoken');
const {
  CustomException,
  ErrorMessages,
  ErrorCodes,
  ErrorStatus,
} = require('../../utils');
const { CONFIG } = require('../../config');

class JwtService {
  #BASE_OPTIONS;

  #accessSecret;

  #refreshSecret;

  constructor() {
    this.#accessSecret = CONFIG.ACCESS_TOKEN_SECRET;
    this.#refreshSecret = CONFIG.REFRESH_TOKEN_SECRET;
    this.#BASE_OPTIONS = {
      issuer: 'FullStack1.com',
      audience: 'FullStack1.com',
    };
  }

  /**
   *
   * @param {{
   *  id: string,
   *  username: string,
   * }} user
   * @param {*} jwtid
   * @returns
   */
  generateAccessToken({ username, id }, jwtid = undefined) {
    try {
      const opts = {
        ...this.#BASE_OPTIONS,
        subject: String(id),
      };

      if (jwtid) opts.jwtid = jwtid;

      return jwt.sign(
        {
          user: { id, username },
        },
        this.#accessSecret,
        {
          expiresIn: '1h', // 0s / 1m / 1h
        },
      );
    } catch (err) {
      console.log(err);

      throw new CustomException(
        ErrorMessages.GenerateAccessToken,
        ErrorCodes.GenerateAccessToken,
      );
    }
  }

  generateRefreshToken(userId, jwtid = undefined) {
    try {
      const opts = {
        ...this.#BASE_OPTIONS,
      };

      return jwt.sign(
        {
          user: { id: userId },
        },
        this.#refreshSecret,
        {
          ...opts,
          expiresIn: '1d', // 30s / 30m
        },
      );
    } catch (err) {
      console.log(err);

      throw new CustomException(
        ErrorMessages.GenerateRefreshToken,
        ErrorCodes.GenerateRefreshToken,
      );
    }
  }

  verifyAccessToken(accessToken) {
    try {
      const result = jwt.verify(accessToken, this.#accessSecret);
      return result;
    } catch (err) {
      throw new CustomException(
        err.message || ErrorMessages.VerifyToken,
        err.code || ErrorCodes.VerifyToken,
        err.staus || ErrorStatus.Forbidden,
      );
    }
  }

  verifyRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, this.#refreshSecret);
    } catch (err) {
      throw new CustomException(
        err.message || ErrorMessages.VerifyToken,
        err.code || ErrorCodes.VerifyToken,
        err.staus || ErrorStatus.Forbidden,
      );
    }
  }
}

module.exports = { JwtService };
