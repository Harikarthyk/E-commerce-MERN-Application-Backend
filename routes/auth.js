const express = require("express");
const router = express.Router();
const {
	register,
	login,
	activationLink,
	logout,
	getOTPforPassword,
	setNewPassword,
	isSignedIn,
	isAuthenticated,
} = require("../controllers/auth");

router.post("/register", register);

router.post("/login", login);

router.post("/activate", activationLink);

router.get("/logout", logout);

router.post("/forgotpassword", getOTPforPassword);

router.post("/set/password", setNewPassword);

// router.post('/activate/selleraccount/:userId',isSignedIn,isAuthenticated , reqSellerAccount)

module.exports = router;
