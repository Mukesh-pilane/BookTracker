const express = require("express");
const checkAuth = require("../../middleware/checkAuth");
const { errorWrapper } = require("../../utils/errorWrapper");
const { createCategory, fetchCategory, editCategory } = require("./category.controller");

const router = express.Router();

router.post('/', checkAuth, errorWrapper(createCategory));
router.get('/', checkAuth, errorWrapper(fetchCategory));
router.put('/:categoryId', checkAuth, errorWrapper(editCategory));
module.exports = router;