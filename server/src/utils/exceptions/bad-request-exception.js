const { AppError } = require('../error-handler');

class BadRequestException extends AppError {
  constructor(
    message,
    code = AppError.ErrorCodes.BadRequest,
    status = AppError.ErrorStatus.BadReqeust
  ) {
    super({
      message,
      status,
      code,
    });
  }
}

module.exports = { BadRequestException };

