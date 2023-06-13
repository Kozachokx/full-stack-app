const { AppError, ErrorStatus, ErrorCodes, ErrorMessages } = require('../utils');

const notFoundHandler = (req, res, next) => {
  const err = new AppError({
    status: ErrorStatus.NotFound,
    code: ErrorCodes.RouteNotFound,
    message: `${ErrorMessages.RouteNotFound}::: URL : ${req.originalUrl}`,
  });

  next(err);
};

module.exports = { notFoundHandler };
