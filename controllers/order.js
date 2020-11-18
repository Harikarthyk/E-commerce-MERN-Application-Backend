const { result } = require('lodash');
const { Order } = require('../models/order');

exports.addOrderByUserId = (req, res) => {
	let newOrder = new Order(req.body);
	newOrder.save((error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'Error in placing order',
			});
		}
		return res.status(200).json({
			message: 'Order Placed Successfully',
		});
	});
};

exports.getOrderforUserId = (req, res) => {
	Order.find({ user: req.user._id })
		.populate('products.product', 'name price category')
		.exec((error, result) => {
			if (error) {
				return res.status(400).json({
					error: 'Error in finding the orders',
				});
			}
			return res.status(200).json({
				orders: result,
			});
		});
};

exports.getAllOrderByUserIdAdmin = (req, res) => {
	Order.find()
		.populate('products.product', 'name price category')
		.populate('user', 'name')
		.exec((error, result) => {
			if (error) {
				return res.status(400).json({
					error: 'Error in finding the orders',
				});
			}
			return res.status(200).json({
				orders: result,
			});
		});
};

exports.updateOrderStatus = (req, res) => {
	Order.findOneAndUpdate({ _id: req.order._id }, { $set: req.body }).exec(
		(error, result) => {
			if (error) {
				return res.status(400).json({
					error: 'Error in updaing the order',
				});
			}
			return res.status(200).json({
				message: 'Delivery Successfully...',
			});
		},
	);
};

exports.getOrderById = (req, res, next, id) => {
	Order.findById(id).exec((error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'Error in finding the Order',
			});
		}
		req.order = result;
		next();
	});
};
