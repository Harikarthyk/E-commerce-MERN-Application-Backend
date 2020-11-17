const express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const {
	getCategoryById,
	getAllProductsByCategoryId,
	addCategory,
	getAllCategory,
	editCategoryById,
	deleteCategoryById,
	getCategoryInfo,
} = require('../controllers/category');
const { getUserById } = require('../controllers/user');
const router = express.Router();

router.param('categoryId', getCategoryById);

router.param('userId', getUserById);

router.get('/category/product/:categoryId', getAllProductsByCategoryId);

router.get('/category/:categoryId', getCategoryInfo);

router.post(
	'/add/category/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	addCategory,
);

router.get('/all/category', getAllCategory);

router.put(
	'/edit/category/:categoryId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	editCategoryById,
);

router.delete(
	'/delete/:categoryId/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	deleteCategoryById,
);

module.exports = router;
