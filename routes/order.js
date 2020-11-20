const express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const {
	addOrderByUserId,
	getOrderforUserId,
	getAllOrderByUserIdAdmin,
	updateOrderStatus,
	getOrderById,
} = require('../controllers/order');
const { getUserById } = require('../controllers/user');
const router = express.Router();

router.param('userId', getUserById);

router.param('orderId', getOrderById);

router.get('/all/orders/:userId', getAllOrderByUserIdAdmin);

router.get('/orders/:userId', getOrderforUserId);

router.post(
	'/place/order/:userId',
	isSignedIn,
	isAuthenticated,
	addOrderByUserId,
);

router.post('/update/status/order/:orderId/:userId', updateOrderStatus);

module.exports = router;
