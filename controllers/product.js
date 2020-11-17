const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.getProductId = (req, res, next, id) => {
	Product.findById(id).exec((error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'Error in finding the Product',
			});
		}
		req.product = result;
		next();
	});
};

exports.getProductInfoById = (req, res) => {
	if (!req.product) {
		return res.status(400).json({
			error: 'Error in finding the product',
		});
	}
	Product.findOne({ _id: req.product._id })
		.populate('category', '_id name')
		.exec((error, result) => {
			return res.status(200).json({
				product: result,
			});
		});
};

exports.getAllProducts = (req, res) => {
	Product.find().exec((error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'Unable to get Products',
			});
		}
		return res.status(200).json({
			products: result,
		});
	});
};

exports.addProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (error, fields, file) => {
		if (error) {
			return res.status(400).json({
				error: 'Problem with uploading the photo',
			});
		}
		const { name, category, stock, price, description } = fields;
		if (!name) {
			return res.status(400).json({ error: 'Enter All Fields (name)' });
		}
		if (!category) {
			return res.status(400).json({ error: 'Enter All Fields (category)' });
		}
		if (!price) {
			return res.status(400).json({ error: 'Enter All Fields (price)' });
		}
		if (!stock) {
			return res.status(400).json({ error: 'Enter All Fields (stock)' });
		}
		if (!category) {
			return res.status(400).json({ error: 'Enter All Fields (description)' });
		}
		if (!name || !description || !price || !category || !stock)
			return res.status(400).json({ error: 'Enter All Fields' });

		const product = new Product(fields);
		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: 'File Size is to Big',
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}
		product.user = req.user._id;
		product.save((error, docs) => {
			if (error)
				return res.status(400).json({
					error: 'Unable to save the Product in the DB',
				});
			return res.status(200).json({
				message: 'Product Added Successfully',
				product: docs,
			});
		});
	});
};

exports.updateProductById = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (error, fields, file) => {
		if (error) {
			return res.status(400).json({
				error: 'Problem with uploading the photo',
			});
		}
		let product = req.product;
		product = _.extend(product, fields);
		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: 'Photo size is Large choose less than 3mb',
				});
			}
			if (file.photo.path)
				product.photo.data = fs.readFileSync(file.photo.path);
			else
				return res.status(400).json({
					error: 'Image format not supported',
				});
			product.photo.contentType = file.photo.type;
		}
		product.save((error, docs) => {
			if (error)
				return res.status(400).json({
					error: 'Unable to save the Product in the DB',
				});
			return res.status(200).json({
				message: 'Product Updated Successfully',
			});
		});
	});
};

exports.deleteProductById = (req, res) => {
	Product.deleteOne({ _id: req.product._id }, (error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'Unable to delete the Product',
			});
		}
		return res.status(200).json({
			message: 'product delete successfully',
		});
	});
};
exports.photo = (req, res, next) => {
	if (req.product.photo.data) {
		res.set('Content-Type', req.product.photo.contentType);
		return res.send(req.product.photo.data);
	}
	next();
};
