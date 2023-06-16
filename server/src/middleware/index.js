module.exports = {
  ...require('./allow-anonymous-user.middleware'),
  ...require('./auth-verify-jwt.middleware'),
  ...require('./error.middleware'),
  ...require('./handle-async-error.middleware'),
  ...require('./limiter-login.middleware'),
  ...require('./limiter-sign-up.middleware'),
  ...require('./not-found.middleware'),
};
