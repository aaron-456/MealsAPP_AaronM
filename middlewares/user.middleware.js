const User = require('./../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }
  req.user = user;
  next();
});

exports.validExistUserbyId = catchAsync(async (req, res, next) => {
  const { userId } = req.body;

  const user = await User.findOne({
    where: {
      id: userId,
      status: 'active',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `The user ${userId} not found`,
    });
  }

  req.body.userId = userId;
  next();
});

exports.validEmailUniqueness = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: { email: email.toLowerCase() },
  });

  if (user) {
    return next(new AppError('Email already exists', 400));
  }

  next();
});
