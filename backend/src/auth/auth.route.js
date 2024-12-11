const express = require("express");
require('dotenv').config();

const { login, logout, sendResetPasswordLink, resetPassword } = require('./auth.controller');
const checkAuth = require("../../middleware/checkAuth");
const { errorWrapper } = require('../../utils/errorWrapper');

const router = express.Router();

router.post("/login", errorWrapper(login));

router.post("/logout", checkAuth ,errorWrapper(logout) );

router.post("/forgot-password", errorWrapper(sendResetPasswordLink));

router.post("/reset-password/:token", errorWrapper(resetPassword));



module.exports = router;