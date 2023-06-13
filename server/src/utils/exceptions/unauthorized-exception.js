const { AppError } = require('../error-handler');

class UnauthorizedException extends AppError {
  constructor(
    message = AppError.ErrorMessages.Unauthorized,
    code = AppError.ErrorCodes.Unauthorized,
    status = AppError.ErrorStatus.Unauthorized
  ) {
    super({
      message,
      status,
      code,
    });
  }
}

module.exports = { UnauthorizedException };

