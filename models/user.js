const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		phoneNo: {
			type: Number,
		},
		role: {
			type: Number,
			default: 0,
		},
		orders: {
			type: Array,
			default: [],
		},
		verified: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('User', userSchema);
