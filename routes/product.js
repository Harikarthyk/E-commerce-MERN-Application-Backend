const express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const {
	getProductId,
	getProductInfoById,
	getAllProducts,
	addProduct,
	updateProductById,
	deleteProductById,
	photo,
} = require('../controllers/product');
const { getUserById } = require('../controllers/user');
const router = express.Router();

router.param('productId', getProductId);

router.param('userId', getUserById);

router.get('/product/:productId', getProductInfoById);

router.get('/all/products', getAllProducts);

router.post('/add/product/:userId', isSignedIn, isAuthenticated, addProduct);

router.put(
	'/update/product/:productId/:userId',
	isSignedIn,
	isAuthenticated,
	updateProductById,
	isAdmin,
);

router.delete(
	'/delete/product/:productId/:userId',
	isSignedIn,
	isAuthenticated,
	deleteProductById,
	isAdmin,
);

router.get('/product/photo/:productId', photo);

module.exports = router;
