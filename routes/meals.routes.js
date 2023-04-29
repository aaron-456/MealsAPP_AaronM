const mealController = require('../controllers/meal.controller');
const express = require('express');

//Middlewares
const validationsMiddleware = require('../middlewares/validation.middleware');
const restaurantMiddleware = require('../middlewares/restaurant.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const mealMiddleware = require('../middlewares/meals.middlewares');

const router = express.Router();

router.get('/', mealController.mealsGetAll);

router
  .route('/:id')
  .post(
    authMiddleware.protect,
    restaurantMiddleware.validIfExistRestaurant,
    validationsMiddleware.createMealValidation,
    mealController.mealCreate
  )
  .get(mealMiddleware.validIfExistMeal, mealController.mealGetById)
  .patch(
    authMiddleware.protect,
    mealMiddleware.validIfExistMeal,
    mealController.mealUpdate
  )
  .delete(
    authMiddleware.protect,
    mealMiddleware.validIfExistMeal,
    mealController.mealDelete
  );

module.exports = router;
