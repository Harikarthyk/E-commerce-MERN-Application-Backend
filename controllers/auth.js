const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const expressJWT = require('express-jwt');
const { result } = require('lodash');

const generateRandomNumber = () => {
	let k = 4;
	let result = '';
	while (k-- > 0) {
		result += Math.floor(Math.random() * 9);
	}
	return result;
};

exports.activationLink = (req, res) => {
	User.findOne({ email: req.body.email }, (error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'Error in Registration',
			});
		}
		if (result) {
			return res.status(400).json({
				error: 'User Already exists',
			});
		}
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'hari.jsmith494@gmail.com',
				pass: 'lfpgbeieoqbtzenq',
			},
		});
		var randomCode = generateRandomNumber();
		var mailOptions = {
			from: 'hari.jsmith494@gmail.com',
			to: req.body.email,
			subject: `Clothings Verification Mail `,
			html: `<h2>Your Verification is <i>${randomCode}</i> (expires in 5 minutes) </h2>`,
		};
		transporter.sendMail(mailOptions, function (err, info) {
			if (err) {
				return res.status(400).json({
					error: 'Error in registration',
				});
			}
		});
		return res.status(200).json({
			message: 'Check your mail for Activation code ',
			code: randomCode,
			time: new Date(),
		});
	});
};

exports.register = (req, res) => {
	User.findOne({ email: req.body.email }, (error, result) => {
		if (result || error) {
			return res.status(400).json({
				error: 'User already Exists',
			});
		}
		bcrypt.hash(req.body.password, 10, function (err, hash) {
			if (err) {
				return res.status(400).json({
					error: `Error in registration`,
				});
			}
			req.body.password = hash;
			let newUser = new User(req.body);
			newUser.save((error, result) => {
				if (error) {
					return res.status(400).json({
						error: 'Error in registration',
					});
				}
				return res.status(200).json({
					message: 'Registration successfull',
				});
			});
		});
	});
};

exports.login = (req, res) => {
	User.findOne({ email: req.body.email }, (error, result) => {
		if (error || !result) {
			return res.status(400).json({
				error: 'user not found',
			});
		}
		bcrypt.compare(req.body.password, result.password, function (err, check) {
			if (err || !check) {
				return res.status(400).json({
					error: 'Missmatch Password',
				});
			}
			let token = jwt.sign({ _id: result._id }, 'secretCode');
			res.cookie('token', token, {
				expires: new Date(Date.now() + 10),
			});
			result.password = undefined;
			req.user = result;
			return res.status(200).json({
				message: 'Successfully Signed in',
				user: result,
				token: token,
			});
		});
	});
};

exports.logout = (req, res) => {
	res.clearCookie('token');
	res.status(200).json({
		message: 'Sign Out Successfully',
	});
};

exports.isSignedIn = expressJWT({
	secret: 'secretCode',
	algorithms: ['HS256'],
	userProperty: 'auth',
});

exports.isAuthenticated = (req, res, next) => {
	let check = req.auth && req.user && req.auth._id == req.user._id;
	if (!check) {
		return res.status(400).json({
			error: 'Unauthorized Access',
		});
	}
	next();
};

exports.isAdmin = (req, res, next) => {
	if (req.user._id === 0) {
		res.status(400).json({
			error: 'Unauthorized Access',
		});
	}
	next();
};

exports.getOTPforPassword = (req, res) => {
	User.find({ email: req.body.email }, (error, result) => {
		if (error || result.length === 0) {
			return res.status(400).json({
				error: 'User not Found',
			});
		}
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'hari.jsmith494@gmail.com',
				pass: 'lfpgbeieoqbtzenq',
			},
		});
		var OTP = generateRandomNumber();
		var mailOptions = {
			from: 'hari.jsmith494@gmail.com',
			to: req.body.email,
			subject: `Clothings Verification Mail `,
			html: `<h2>Your OTP <i>${OTP}</i> (expires in 5 minutes) </h2>`,
		};
		transporter.sendMail(mailOptions, function (err, info) {
			if (err) {
				return res.status(400).json({
					error: 'Error in registration',
				});
			}
		});
		return res.status(200).json({
			OTP: OTP,
			message: 'Check your mail',
		});
	});
};

exports.setNewPassword = (req, res) => {
	bcrypt.hash(req.body.password, 10, function (err, hash) {
		if (err) {
			return res.status(400).json({
				error: `Error in Password Updation`,
			});
		}
		User.findOneAndUpdate(
			{ email: req.body.email },
			{ $set: { password: hash } },
			(error, result) => {
				if (error) {
					return res.status(400).json({
						error: 'Error in reseting the password',
					});
				}
				return res.status(200).json({
					message: 'Password updated Successfully',
				});
			},
		);
	});
};

exports.reqSellerAccount = (req,res) => {

	
}