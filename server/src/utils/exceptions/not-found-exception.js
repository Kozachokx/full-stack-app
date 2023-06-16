const { AppError } = require('../error-handler');

class NotFoundException extends AppError {
  constructor(
    message,
    code = AppError.ErrorCodes.Default,
    status = AppError.ErrorStatus.NotFound
  ) {
    super({
      message,
      status,
      code,
    });
  }
}

module.exports = { NotFoundException };

