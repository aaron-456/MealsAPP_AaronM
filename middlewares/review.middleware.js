const Review = require('../models/review.model');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.validateReviewProperty = catchAsync(async (req, res, next) => {
  const { restaurantId, id } = req.params;
  const { sessionUser } = req;

  const review = await Review.findOne({
    where: {
      id,
      restaurantId,
      status: 'active',
    },
  });

  if (!review) {
    return next(new AppError(`Review with id ${id} not found`, 404));
  }

  if (review.userId !== sessionUser.id) {
    return next(
      new AppError('You are not authorized to update this review', 401)
    );
  }

  req.review = review;
  next();
});
