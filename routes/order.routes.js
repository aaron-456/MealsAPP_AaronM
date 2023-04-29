const orderController = require('../controllers/order.controller');
const express = require('express');

const orderMiddleware = require('../middlewares/order.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/', orderController.orderCreate);
router.get('/me', orderController.orderGetAllUser);
router
  .route('/:id')
  .patch(orderMiddleware.validIfExistOrder, orderController.orderUpdate)
  .delete(orderMiddleware.validIfExistOrder, orderController.orderDelete);

module.exports = router;
