const rateLimit = require('express-rate-limit');
const { ErrorCodes, ErrorStatus } = require('../constants');
const minutes = 30;

const loginLimiter = rateLimit({
  windowMs: minutes * 60 * 1000, // 30 min
  max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
  message:
		`Too many login attempts from this IP, please try again after ${minutes} min pause`,
  handler: (request, response, next, options) => {
    console.log('Options: ');
    console.log(options);
    console.log(' ');
    response.status(options.statusCode || ErrorStatus.TooManyRequests).send({
      message: options.message,
      code: ErrorCodes.TooManyRequests,
      status: ErrorStatus.TooManyRequests
    });
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = { loginLimiter };
