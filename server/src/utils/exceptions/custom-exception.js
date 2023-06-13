const { AppError } = require('../error-handler');

class CustomException extends AppError {
  constructor(
    message,
    code = AppError.ErrorCodes.GeneralException,
    status = AppError.ErrorStatus.BadReqeust
  ) {
    super({
      message,
      status,
      code,
    });
  }
}

module.exports = { CustomException };

