const { ErrorStatus, ErrorMessages, ErrorCodes } = require('../constants');
const { JwtService } = require('../controllers/auth/jwt.service');

const jwtService = new JwtService();

const jwtAuthMiddleware = (req, res, next) => {
  let token = req.headers.Authorization || req.headers.authorization; 

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(ErrorStatus.Unauthorized).send({ message: ErrorMessages.Unauthorized });
  }

  token = token.slice(7);

  try {
    const decoded = jwtService.verifyAccessToken(token);

    if (!decoded) return res.status(ErrorStatus.Forbidden).send({ message: ErrorMessages.Forbiden }); 

    req.user = decoded.user;

    next();
  } catch (err) {
    console.log('[JWT Authentification Middleware] Message: ', err.message);

    return res.status(err.status || ErrorStatus.Forbidden)
      .send({
        message: ErrorMessages.Forbiden,
        status: err.status || ErrorStatus.Forbidden,
        code: err.code || ErrorCodes.VerifyToken,
      }); 
  }
};

module.exports = { jwtAuthMiddleware };
