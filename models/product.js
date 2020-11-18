const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		category: {
			type: ObjectId,
			ref: 'Category',
		},
		photo: {
			data: Buffer,
			contentType: String,
		},
		stock: {
			type: Number,
			required: true,
		},
		sold: {
			type: Number,
			default: 0,
		},
		user: {
			type: ObjectId,
			ref: 'User',
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			trim: true,
		},
		size: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
