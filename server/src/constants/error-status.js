const { HttpCode } = require('./http-status');

const ErrorStatus = {
  BadReqeust: HttpCode.BAD_REQUEST,
  Unauthorized: HttpCode.UNAUTHORIZED,
  Forbidden: HttpCode.FORBIDDEN,
  NotFound: HttpCode.NOT_FOUND,
  MethodNotAllowed: HttpCode.METHOD_NOT_ALLOWED,
  Conflict: HttpCode.CONFLICT,

  TooManyRequests: HttpCode.TOO_MANY_REQUESTS,

  InternalServerError: HttpCode.INTERNAL_SERVER_ERROR,
  NotImplemented: HttpCode.NOT_IMPLEMENTED,
};

module.exports = { ErrorStatus };
