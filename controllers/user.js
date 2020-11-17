const User = require('../models/user');

exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((error, result) => {
		if (error || !result) {
			return res.status(400).json({
				error: 'Unable to find the user',
			});
		}
		result.password = undefined;
		req.user = result;
		next();
	});
};

exports.getUserInfoById = (req, res) => {
	if (!req.user) {
		return res.status(400).json({
			error: 'User not found',
		});
	}
	return res.status(200).json({
		user: req.user,
	});
};

exports.getUserOrders = (req, res) => {
	if (!req.user) {
		return res.status(400).json({
			error: 'User not found',
		});
	}
	return req.status(200).json({
		orders: req.user.orders,
	});
};
