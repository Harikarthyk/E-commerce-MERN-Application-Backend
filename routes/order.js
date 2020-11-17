const express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const router = express.Router();

router.param('userId', getUserById);

router.get(
	'/all/orders/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	getAllOrders,
);

router.get('/orders/:userId', isSignedIn, isAuthenticated, getOrdersByUserId);

module.exports = router;
