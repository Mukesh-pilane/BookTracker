const express = require("express");
const checkAuth = require("../../middleware/checkAuth");
const { errorWrapper } = require("../../utils/errorWrapper");
const { createCategory } = require("./category.controller");

const router = express.Router();

router.post('/add', checkAuth, errorWrapper(createCategory));
module.exports = router;