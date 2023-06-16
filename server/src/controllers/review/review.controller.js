const { Router } = require('express');

const { ReviewService } = require( './review.service');
const { handleAsyncError, allowAnonymousUserMiddleware } = require('../../middleware');
const { jwtAuthMiddleware } = require('../../middleware');
const reviewService = new ReviewService();


// const router = new Router({ mergeParams: true });
const router = new Router();

// Changed to Auth Sign Up
router.post(
  '',
  allowAnonymousUserMiddleware,
  handleAsyncError(async (req, res) => {
    const { body } = req;

    const data = await reviewService.createReview(req.user, body);

    return res.status(data.status || 200).send({ data });
  }),
);

// Use auth middleware for whole User Controller

router.get(
  '/all',
  allowAnonymousUserMiddleware,
  handleAsyncError(async (req, res) => {
    const data = await reviewService.getAll(req.user);

    return res.status(data.status || 200).send({ data });
  }),
);

router.get(
  '/:id',
  allowAnonymousUserMiddleware,
  handleAsyncError(async (req, res) => {
    const { id } = req.params;

    const data = await reviewService.getReviewById(req.user, id);

    return res.status(data.status || 200).send({ data });
  }),
);

router.put(
  '/:id',
  allowAnonymousUserMiddleware,
  handleAsyncError(async (req, res) => {
    const { id } = req.params;

    const data = await reviewService.updateReview(req.user, {
      ...req?.body,
      id,
    });

    return res.status(data.status || 200).send({ data });
  }),
);

router.delete(
  '/:id',
  allowAnonymousUserMiddleware,
  handleAsyncError(async (req, res) => {
    const { id } = req.params;

    console.log(id);
    console.log(req);

    const data = await reviewService.deleteReview(req.user, id);

    return res.status(data.status || 200).send({ data });
  }),
);

module.exports = router;
