const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfExistOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Meal,
        include: [Restaurant],
      },
    ],
  });

  if (!order) {
    return next(new AppError('Order with the provided ID was not found.', 404));
  }

  if (order.status === 'completed') {
    return next(new AppError('Order has already been delivered', 404));
  }

  if (order.status === 'cancelled') {
    return next(new AppError('Order is cancelled', 404));
  }

  req.order = order;
  next();
});
