const { Router } = require('express');

const { UserService } = require( './user.service');
const { createRoutePath } = require( '../../helpers/index.js');
const { handleAsyncError } = require('../../middleware');
const { jwtAuthMiddleware } = require('../../middleware');
const userService = new UserService();


// const router = new Router({ mergeParams: true });
const router = new Router();

// Changed to Auth Sign Up
/*
router.post(
  '',
  handleAsyncError(async (req, res) => {
    const { body } = req;

    const data = await userService.createUser(body);

    return res.status(data.status || 200).send({ data });
  }),
);
*/

router.use(jwtAuthMiddleware);

router.get(
  '/all',
  handleAsyncError(async (req, res) => {
    const data = await userService.getAll();

    return res.status(data.status || 200).send({ data });
  }),
);

router.get(
  '/:id',
  handleAsyncError(async (req, res) => {
    // const { id } = req.query;
    const { id } = req.params;

    const data = await userService.getUserById(id);

    return res.status(data.status || 200).send({ data });
  }),
);

router.put(
  '/:id',
  handleAsyncError(async (req, res) => {
    const { id } = req.params;

    console.log(id);
    console.log(req);

    const data = await userService.updateUser(id, {
      ...req?.body,
      id,
    });

    return res.status(data.status || 200).send({ data });
  }),
);

router.delete(
  '/:id',
  handleAsyncError(async (req, res) => {
    const { id } = req.params;

    console.log(id);
    console.log(req);

    const data = await userService.deleteUser(id);

    return res.status(data.status || 200).send({ data });
  }),
);

module.exports = router;
