const { Router } = require('express');

const { AuthService } = require( './auth.service');
const { handleAsyncError, loginLimiter } = require('../../middleware');
const authService = new AuthService();

// const router = new Router({ mergeParams: true });
const router = new Router();

// For test purposes
router.get(
  '/get',
  () => {
    console.log('SDADASDASDASDA');
  },
);

router.post(
  '/signup',
  handleAsyncError(async (req, res) => {
    const data = await authService.signUp(req.body);

    return res.status(data.status || 200).send({ data });
  }),
);

router.post(
  '/login',
  loginLimiter,
  handleAsyncError(async (req, res) => {
    const data = await authService.login(req.body);

    return res.status(data.status || 200).send({ data });
  }),
);

router.post(
  '/refresh',
  loginLimiter,
  handleAsyncError(async (req, res) => {
    const data = await authService.refresh(req.body?.refreshToken);

    return res.status(data.status || 200).send({ data });
  }),
);

router.post(
  '/logout',
  handleAsyncError(async (req, res) => {
    // const req.
    const data = await authService.logout(3);

    return res.status(data.status || 200).send({ data });
  }),
);

module.exports = router;
