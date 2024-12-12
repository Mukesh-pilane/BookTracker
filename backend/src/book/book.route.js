const express = require("express");
const checkAuth = require("../../middleware/checkAuth");
const bucketUpload = require("../../utils/bucketUpload");
const { errorWrapper } = require("../../utils/errorWrapper");
const { createBook, getAllbookByUser } = require("./book.controller");
const validateBook = require("./book.validator"); // Adjust path
const multer = require('multer');
const upload = multer();
const router = express.Router();

// Route to handle file upload with authentication
router.post('/add', checkAuth, upload.fields([
    { name: 'file', maxCount: 1 },
]), validateBook, bucketUpload, errorWrapper(createBook));

router.get('/getAllUserBook', checkAuth, errorWrapper(getAllbookByUser));

module.exports = router;