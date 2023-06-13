const { CONFIG } = require('../config');

const errorMiddleware = (err, req, res, next) => {
  console.error('[ERROR_MIDDLEWARE] ERROR: ', err);

  const productionResponse = {
    code: err.code || 'default',
    status: err.status || 500,
    message: err.isCustom ? err.message : 'default',
  };

  const developmentResponse = {
    ...productionResponse,
    stack: err.stack,
    message: err.message,
  };

  const env = CONFIG.NODE_ENV;
  const responce = env === 'prod' ? productionResponse : developmentResponse;

  return res
    .status(productionResponse.status)
    .json(responce);
};

module.exports = { errorMiddleware };
