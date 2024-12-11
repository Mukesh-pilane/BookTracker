const express = require("express");
const { errorWrapper } = require("../../utils/errorWrapper");
const checkAuth = require("../../middleware/checkAuth");
const checkPermission = require("../../middleware/checkPermission");
const { insertBulkUpload, getFile, getFileById } = require("./bulkUpload.controller");
const { upload } = require("../../utils/upload");
const router = express.Router();

router.get("/", checkAuth, checkPermission, errorWrapper(getFile));
router.get("/:id", checkAuth, checkPermission, errorWrapper(getFileById));
router.post("/", checkAuth, checkPermission, upload, errorWrapper(insertBulkUpload));

module.exports = router;