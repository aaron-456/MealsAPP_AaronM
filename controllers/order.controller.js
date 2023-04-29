const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.orderCreate = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });

  if (!meal) {
    return next(new AppError('Meal not found', 404));
  }
  //Creamos la funcion de la cantidad que quire el cliente y la multiplic9mos por la comida elejida
  const totalPrice = quantity * meal.price;

  const order = await Order.create({
    mealId,
    userId: sessionUser.id,
    totalPrice,
    quantity,
  });

  res.status(201).json({
    status: 'success',
    message: 'Order was created successfully',
    order,
  });
});

exports.orderGetAllUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: {
      userId: sessionUser.id,
    },
    include: [
      {
        model: Meal,
        include: [Restaurant],
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders,
    },
  });
});

exports.orderUpdate = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { order } = req;

  await order.update({
    status: 'completed',
  });

  res.status(200).json({
    status: 'success',
    message: 'Order has been update',
  });
});

exports.orderDelete = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({
    status: 'cancelled',
  });

  res.status(200).json({
    status: 'success',
    message: 'Order has been disabled',
  });
});
