const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfExistRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!restaurant) {
    return next(new AppError('restaurant not found', 404));
  }

  req.restaurant = restaurant;
  next();
});
