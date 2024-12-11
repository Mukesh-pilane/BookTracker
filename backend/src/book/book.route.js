const express = require("express");
const checkAuth = require("../../middleware/checkAuth");
const bucketUpload = require("../../utils/bucketUpload");
const { errorWrapper } = require("../../utils/errorWrapper");
const { createBook } = require("./book.controller");
const multer = require('multer');
const upload = multer();
const router = express.Router();

// Route to handle file upload with authentication
router.post('/add', checkAuth, upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'name', maxCount: 1 },
  { name: 'author', maxCount: 1 },
  { name: 'categoryId', maxCount: 1 },
]), bucketUpload, errorWrapper(createBook));

module.exports = router;