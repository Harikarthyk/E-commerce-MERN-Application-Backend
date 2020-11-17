const Category = require('../models/category');
const Product = require('../models/product');

exports.getCategoryById = (req, res, next, id) => {
	Category.findById(id).exec((error, result) => {
		if (error || !result) {
			return res.status(400).json({
				error: 'Error in finding the Category/ Category not found .',
			});
		}
		req.category = result;
		next();
	});
};

exports.getCategoryInfo = (req, res) => {
	if (!req.category) {
		return res.status(400).json({
			error: 'Error in finding the category',
		});
	}
	return res.status(200).json({
		category: req.category,
	});
};

exports.getAllProductsByCategoryId = (req, res) => {
	Product.find({ category: req.category._id }, (error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'Error in finding the Category ',
			});
		}
		return res.status(200).json({
			products: result,
		});
	});
};

exports.addCategory = (req, res) => {
	Category.find({ name: req.body.name }, (error, check) => {
		if (error || check.length >= 1) {
			return res.status(400).json({
				error: 'Category Already Exists',
			});
		}
		let newCategory = new Category(req.body);
		newCategory
			.save()
			.then((result) => {
				return res.status(200).json({
					message: 'Category Added',
				});
			})
			.catch((error) =>
				res.status(400).json({ error: 'Error in adding the category' }),
			);
	});
};

exports.getAllCategory = (req, res) => {
	Category.find().exec((error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'Error in getting all Categories',
			});
		}
		return res.status(200).json({
			categories: result,
		});
	});
};

exports.editCategoryById = (req, res) => {
	Category.findOneAndUpdate({ _id: req.category._id }, { $set: req.body }).exec(
		(error, result) => {
			if (error) {
				return res.status(400).json({
					error: 'Error in updating the category',
				});
			}
			return res.status(200).json({
				message: 'Updated Successfully',
			});
		},
	);
};

exports.deleteCategoryById = (req, res) => {
	Category.deleteOne({ _id: req.category._id }, (error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'Error in deleting category',
			});
		}
		return res.status(200).json({
			message: 'Category deleted Successfully',
		});
	});
};
