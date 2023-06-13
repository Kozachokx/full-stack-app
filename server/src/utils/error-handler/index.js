const { ErrorCodes, ErrorMessages, ErrorStatus } = require('../../constants');

class AppError extends Error {
  constructor(opts) {
    let data;
    let stack;
    let target;
    let code;
    let status;
    let message;

    super(typeof opts === 'string' ? opts : opts.message);

    if (typeof opts === 'string') {
      message = opts;
    } else if (typeof opts === 'object') {
      ({
        data,
        stack,
        target,
        status = ErrorStatus.InternalServerError,
        code = ErrorCodes.Default,
        message = ErrorMessages.SomethingWentWrong,
      } = opts);
    }

    this.code = code;
    this.isCustom = true;
    this.status = status;
    this.target = target;
    this.message = message;
    this.data = JSON.stringify(data);

    if (stack) {
      this.stack = stack;
      this.stackStr = stack;
    } else {
      Error.captureStackTrace(this);
      this.stackStr = this.stack;
    }
  }

  static get ErrorCodes() {
    return ErrorCodes;
  }

  static get ErrorMessages() {
    return ErrorMessages;
  }

  static get ErrorStatus() {
    return ErrorStatus;
  }
}

module.exports = { AppError, ErrorCodes, ErrorMessages, ErrorStatus };
