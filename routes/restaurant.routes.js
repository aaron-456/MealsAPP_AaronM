const express = require('express');

//Controllers
const restaurantController = require('../controllers/restaurant.controller');
const reviewController = require('../controllers/review.controller');

//Middlewares
const validationsMiddleware = require('../middlewares/validation.middleware');
const restaurartMiddleware = require('../middlewares/restaurant.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const reviewMiddleware = require('../middlewares/review.middleware');

const router = express.Router();

router
  .route('/')
  .post(
    validationsMiddleware.createRestaurantValidation,
    restaurantController.restaurantCreate
  )
  .get(restaurantController.restaurantGetall);

router
  .route('/:id')
  .get(
    restaurartMiddleware.validIfExistRestaurant,
    restaurantController.getRestaurantById
  )
  .patch(
    restaurartMiddleware.validIfExistRestaurant,
    restaurantController.restaurantUpdate
  )
  .delete(
    restaurartMiddleware.validIfExistRestaurant,
    restaurantController.deleteRestaurant
  );

router.use(authMiddleware.protect);
router.post(
  '/reviews/:id',
  restaurartMiddleware.validIfExistRestaurant,
  reviewController.reviewCreate
);

router
  .route('/reviews/:restaurantId/:id')
  .patch(reviewMiddleware.validateReviewProperty, reviewController.reviewUpdate)
  .delete(
    reviewMiddleware.validateReviewProperty,
    reviewController.reviewDelete
  );

module.exports = router;

//A
