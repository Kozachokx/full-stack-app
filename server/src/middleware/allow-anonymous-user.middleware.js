const { ErrorStatus, ErrorMessages, ErrorCodes } = require('../constants');
const { JwtService } = require('../controllers/auth/jwt.service');

const jwtService = new JwtService();

const allowAnonymousUserMiddleware = (req, res, next) => {
  let token = req.headers.Authorization || req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return next();
  }

  token = token.slice(7);

  try {
    const decoded = jwtService.verifyAccessToken(token);

    if (!decoded) {
      return res.status(ErrorStatus.BadReqeust).send({ message: ErrorMessages.VerifyToken });
    }

    req.user = decoded.user;

    next();
  } catch (err) {
    console.log('[Anonymous User Middleware] Message: ', err.message);

    return res.status(err.status || ErrorStatus.Forbidden)
      .send({
        message: err.message || ErrorMessages.Forbiden,
        status: err.status || ErrorStatus.Forbidden,
        code: err.code || ErrorCodes.VerifyToken,
      });
  }
};

module.exports = { allowAnonymousUserMiddleware };
