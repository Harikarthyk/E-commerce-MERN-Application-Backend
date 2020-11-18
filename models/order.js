const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const PurchasedProductSchema = new mongoose.Schema({
	product: { type: ObjectId, ref: 'Product' },
	size: {
		type: String,
	},
	count: {
		type: Number,
	},
});

const PurchasedProduct = mongoose.model(
	'PurchasedProduct',
	PurchasedProductSchema,
);

const orderSchema = new mongoose.Schema({
	products: [PurchasedProductSchema],
	total: {
		type: Number,
		required: true,
	},
	user: {
		type: ObjectId,
		ref: 'User',
	},
	street: {
		type: String,
		required: true,
		trim: true,
	},
	state: {
		type: String,
		required: true,
		trim: true,
	},
	district: {
		type: String,
		required: true,
		trim: true,
	},
	phoneNo: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		default: 'Pending',
	},
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {
	Order,
	PurchasedProduct,
};
