const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

//Routes
const userRouter = require('./routes/users.routes');
const restaurantRouter = require('./routes/restaurant.routes');
const mealRouter = require('./routes/meals.routes');
const orderRouter = require('./routes/order.routes');

const app = express();
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/orders', orderRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`cannot find ${req.originalUrl} on this server! `, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
