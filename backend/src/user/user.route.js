const express = require("express");

const { errorWrapper } = require('../../utils/errorWrapper');

const { createUser } = require('./user.controller');

const router = express.Router();

router.post('/', errorWrapper(createUser));
module.exports = router;

