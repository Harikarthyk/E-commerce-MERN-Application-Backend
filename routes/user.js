const express = require('express');
const router = express.Router();
const {
	getUserById,
	getUserInfoById,
	getUserOrders,
} = require('../controllers/user');

router.param('userId', getUserById);

router.get('/user/:userId', getUserInfoById);

router.get('/orders/:userId', getUserOrders);

module.exports = router;
