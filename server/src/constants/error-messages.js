const ErrorMessages = {
  SomethingWentWrong: 'Something went wrong.',

  Forbiden: 'Forbiden',
  Unauthorized: 'Unauthorized',
  RouteNotFound: 'Route not found',

  NotValidDataInQuery: 'Incorrect data were provided in the request query parameters.',
  NotValidDataInParams: 'Incorrect data were provided in the request parameters.',
  NotValidDataInBody: 'Incorrect data were provided in the request body.',

  RequestQueryEmpty: 'The request query params object is empty.',
  RequestParamsEmpty: 'The request params is empty.',
  RequestBodyEmpty: 'The request body object is empty.',

  UserNotFound: 'User not found',

  FindToken: 'Find token error',
  UpdateToken: 'Update token error',
  CreateToken: 'Create token error',
  GenerateAccessToken: 'Generate access token error',
  GenerateRefreshToken: 'Generate refresh token error',
  LoginWeb: 'Login web error',
  VerifyToken: 'Verify token error',

  // ...
};

module.exports = { ErrorMessages };
