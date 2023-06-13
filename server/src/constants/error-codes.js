const ErrorCodes = {
  Default: 1000,
  BadParameters: 1001,
  Duplicate: 1002,

  FindToken: 1011,
  UpdateToken: 1012,
  CreateToken: 1013,
  GenerateAccessToken: 1014,
  GenerateRefreshToken: 1015,
  VerifyToken: 1016,

  Unauthorized: 1020,
  UserNotFound: 1021,


  GeneralException: 4000,
  BadRequest: 4001,
  MiddlewareError: 4002,
  ValidationError: 4003,
  RouteNotFound: 4004,
  TooManyRequests: 4005,

  // GenerateAccessToken: 4004,
};

module.exports = { ErrorCodes };
