const HttpCode = {
  // Successful 2xx
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  
  // Client error 4xx
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,

  TOO_MANY_REQUESTS: 429,

  // Server error 5xx
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
};

module.exports = { HttpCode };
