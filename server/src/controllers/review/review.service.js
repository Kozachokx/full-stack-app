const { Review } = require('../../database');
const { CustomException, ErrorMessages, ErrorCodes, BadRequestException, NotFoundException } = require('../../utils');
const { UserService } = require('../user/user.service');

class ReviewService {
  constructor() {
    this.userService = new UserService();
    this.reviewRepository = Review;
  }

  async createReview(user, params) {
    try {
      console.log('Create for:');
      console.log(user ? user : 'Anonymous');

      const dbUser = user
        ? await this.userService.getUserById(user.id)
        : await this.userService.getAnonymUser();

      console.log(dbUser);

      if (!dbUser) throw BadRequestException(`User with id '${user.id}' not found!`);

      const review = await this.reviewRepository.create({
        user: dbUser,
        author: `${dbUser.firstName} ${dbUser.lastName}`,
        text: params.text,
        imageUrl: params.imageUrl,
        verified: false
      });

      if (!review) throw new BadRequestException('Invalid review data received');

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
    
    return { user: review };
  }

  async getAll(user) {
    if (user) {
      const isAdmin = this.userService.isAdmin(user.id);
      return isAdmin
        ? await this.reviewRepository.find()
        : await this.reviewRepository.find({
          $or: [{ user: user.id }, { verified: true }]
        });
    }

    return await this.reviewRepository.find({ verified: true });    
  }

  async updateReview(user, reviewParams) {
    try {
      const review = await this.reviewRepository.findOne({ id: reviewParams.id });

      if(!review) throw new NotFoundException('Review not found!');

      const updatedUser = {};

      return updatedUser; 
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

      if (!review) throw new BadRequestException('Review not found!');

      // Delete all user Notes
      await this.noteRepository.deleteMany({ user: review._id });

      const result = await review.deleteOne();

      return {
        message: `User '${result.username}' with ID '${result.id}' has been deleted.`
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
