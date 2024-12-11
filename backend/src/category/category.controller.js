const response = require('../../utils/response');
const { addCategory } = require("./category.service");

module.exports.createCategory = async (req, res) => {
    const { category } = req.body;
    const userId = req.userData.id;
    const result = await addCategory(userId, category);
    return response.ok(res, result);
}