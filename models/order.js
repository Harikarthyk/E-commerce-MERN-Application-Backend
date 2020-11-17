const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const PurchasedProductSchema = new mongoose.Schema({
	product: { type: ObjectId, ref: 'Product' },
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
	price: {
		type: Number,
	},
	user: {
		type: ObjectId,
		ref: 'User',
	},
	address: {
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
