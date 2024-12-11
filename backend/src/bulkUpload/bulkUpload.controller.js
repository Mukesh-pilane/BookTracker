const response = require("../../utils/response");
const { addBulkUpload, getUploadDetails, exportFileById } = require('./bulkUpload.service');


exports.insertBulkUpload = async (req, res) => {
    const userId = req.userData.id;
    const result = await addBulkUpload(req.files, userId);
    return response.created(res, result);
};

exports.getFile = async (req, res) => {
    const userId = req.userData.id;
    const result = await getUploadDetails(userId);
    return response.ok(res, result);
};

exports.getFileById = async (req, res) => {
    const id = req.params.id;
    const result = await exportFileById(id);
    return response.ok(res, result);
};