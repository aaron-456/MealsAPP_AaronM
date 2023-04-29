const express = require('express');

//Controllers
const userController = require('../controllers/user.controller');

// Middlewares
const userMiddlewares = require('../middlewares/user.middleware');
const validationsMiddleware = require('../middlewares/validation.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const orderMiddleware = require('../middlewares/order.middleware');

const router = express.Router();

router.post(
  '/signup',
  userMiddlewares.validEmailUniqueness,
  validationsMiddleware.createUserValidation,
  userController.signup
);

router.post(
  '/login',
  validationsMiddleware.loginValidation,
  userController.login
);

router.use(authMiddleware.protect);
router
  .route('/:id')
  .patch(
    userMiddlewares.validIfExistUser,
    authMiddleware.protectAccountOwner,
    validationsMiddleware.updateUserValidation,
    userController.update
  )
  .delete(
    userMiddlewares.validIfExistUser,
    authMiddleware.protectAccountOwner,
    userController.delete
  );
router.get('/orders', userController.findAll);
router.get(
  '/orders/:id',
  orderMiddleware.validIfExistOrder,
  userController.findOne
);

module.exports = router;
