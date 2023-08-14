const { SortType } = require('../../constants');
const { Review } = require('../../database');
const {
  CustomException,
  ErrorMessages,
  ErrorCodes,
  BadRequestException,
  NotFoundException,
} = require('../../utils');
const { UserService } = require('../user/user.service');

// TODO: Move it to entity
const ReviewField = {
  id: 'id',
  updatedAt: 'updatedAt',
  createdAt: 'createdAt',
};

class ReviewService {
  constructor() {
    this.userService = new UserService();
    this.reviewRepository = Review;
  }

  async createReview(user, params) {
    try {
      console.log('Create for:');
      console.log(user || 'Anonymous');

      const dbUser = user
        ? await this.userService.getUserById(user.id)
        : await this.userService.getAnonymUser();

      console.log(dbUser);

      if (!dbUser) {
        throw BadRequestException(`User with id '${user.id}' not found!`);
      }

      const author = dbUser.firstName && dbUser.lastName
        ? `${dbUser.firstName} ${dbUser.lastName}`
        : `${dbUser.username}`;

      const review = await this.reviewRepository.create({
        user: dbUser,
        author,
        text: params.text,
        imageUrl: params.imageUrl,
        description: params.description,
        verified: false,
      });

      if (!review) {
        throw new BadRequestException('Invalid review data received');
      }

      return { review };
    } catch (err) {
      console.log(err);

      throw new CustomException(
        err.message || ErrorMessages.SomethingWentWrong,
        err.code || ErrorCodes.Default,
      );
    }
  }

  async getReviewById(user, id) {
    const review = await this.reviewRepository.findOne({ id });

    if (!review) throw new NotFoundException('Review not found');

    return { review };
  }

  async getAll(user, {
    page, size, sortType, sortField,
  }) {
    try {
      const numSkip = Number(page) > 0 ? Number(page) : 1;
      const numLimit = Number(size) > 0 ? Number(size) : 10;
      const options = {
        skip: (numSkip - 1) * numLimit,
        limit: numLimit,
      };

      options.sort = {};
      const field = Object.keys(ReviewField).includes(sortField)
        ? sortField
        : ReviewField.createdAt;

      options.sort[`${field}`] = SortType[`${sortType}`] || SortType.DESC;

      // let searchOptions = {};
      let searchOptions = { verified: true }; // Default for anon users

      if (user) {
        console.log(`User (${!!user}): `, user);
        const isAdmin = this.userService.isAdmin(user.id);

        searchOptions = isAdmin ? {} : { $or: [{ user: user.id }, { verified: true }] };
      }

      const reviews = await this.reviewRepository.find(
        searchOptions,
        { __v: false, _id: false },
        options,
      );

      const count = await this.reviewRepository.find(searchOptions).count();

      return {
        count,
        totalPages: Math.ceil(count / numLimit),
        reviews,
      };
    } catch (err) {
      console.log(err);

      throw new CustomException(
        err.message || ErrorMessages.SomethingWentWrong,
        err.code || ErrorCodes.Default,
      );
    }
  }

  async updateReview(user, reviewParams) {
    try {
      const review = await this.reviewRepository.findOne({
        id: reviewParams.id,
      });

      if (!review) throw new NotFoundException('Review not found!');

      const updatedReview = await review.updateOne({ ...reviewParams });

      return updatedReview;
      // { acknowledged: true, modifiedCount: 1, upsertedId: null, upsertedCount: 0, matchedCount: 1 }
    } catch (err) {
      console.log(err);

      throw new CustomException(
        err.message || ErrorMessages.SomethingWentWrong,
        err.code || ErrorCodes.Default,
      );
    }
  }

  async deleteReview(user, id) {
    try {
      const review = await this.reviewRepository.findOne({ id });

      // TODO Logic to check if have enough rights to delete review

      if (!review) throw new BadRequestException('Review not found!');

      // Delete all user Notes
      // await this.noteRepository.deleteMany({ user: review._id });

      const result = await review.deleteOne();

      return {
        message: `Review with ID '${result.id}' has been deleted.`,
        success: true,
      };
    } catch (err) {
      console.log(err);

      throw new CustomException(
        err.message || ErrorMessages.SomethingWentWrong,
        err.code || ErrorCodes.Default,
      );
    }
  }
}

module.exports = { ReviewService };
