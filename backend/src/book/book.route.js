const express = require("express");
const checkAuth = require("../../middleware/checkAuth");
const bucketUpload = require("../../utils/bucketUpload");
const { errorWrapper } = require("../../utils/errorWrapper");
const { createBook, getAllbookByUser, getSearchFilter, editBook } = require("./book.controller");
const createBookValidator = require("./validators/createBook.validator");
const updateBookValidator = require("./validators/updateBook.validator");
const multer = require('multer');
const upload = multer();
const router = express.Router();

// Route to handle file upload with authentication
router.post('/', checkAuth, upload.fields([
    { name: 'file', maxCount: 1 },
]), createBookValidator, bucketUpload, errorWrapper(createBook));

router.post('/:bookId', checkAuth, updateBookValidator, errorWrapper(editBook));

router.get('/getAllUserBook', checkAuth, errorWrapper(getAllbookByUser));

router.get('/', checkAuth, errorWrapper(getSearchFilter));

module.exports = router;