const express = require('express');
const router = express.Router();
const {
	register,
	login,
	activationLink,
	logout,
} = require('../controllers/auth');

router.post('/register', register);

router.post('/login', login);

router.post('/activate', activationLink);

router.get('/logout', logout);

module.exports = router;
