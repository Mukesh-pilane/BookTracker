const response = require('../../utils/response');
const { addCategory, getAllCategory, updateCategory } = require("./category.service");

module.exports.createCategory = async (req, res) => {
    const { category } = req.body;
    const userId = req.userData.id;
    const result = await addCategory(userId, category);
    return response.ok(res, result);
}


module.exports.fetchCategory = async (req, res) => {
    const userId = req.userData.id;
    const result = await getAllCategory(userId);
    return response.ok(res, result);
}

module.exports.editCategory = async (req, res) => {
    const userId = req.userData.id;
    const { categoryId } = req.params;
    const { category } = req.body;

    const result = await updateCategory(userId, categoryId, { category });
    return response.ok(res, result);
}