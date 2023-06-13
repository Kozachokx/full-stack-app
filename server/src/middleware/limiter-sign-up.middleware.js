const rateLimit = require('express-rate-limit');

const signUpLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 min
  max: 3, // Limit each IP to 5 create account requests per `window` (here, per hour)
  message:
		'Too many accounts created from this IP, please try again after 30 min pause',
  handler: (request, response, next, options) => {
    console.log('Options: ');
    console.log(options);
    console.log(' ');
    response.status(options.statusCode).send(options.message);
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = { signUpLimiter };
