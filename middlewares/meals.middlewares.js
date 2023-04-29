const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfExistMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [{ model: Restaurant }],
  });

  if (!meal) {
    return next(new AppError('Meal not found', 404));
  }

  req.meal = meal;
  next();
});
