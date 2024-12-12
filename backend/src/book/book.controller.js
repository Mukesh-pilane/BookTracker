const response = require('../../utils/response');
const { addBook, getAllbooksOfUser } = require('./book.service');

module.exports.createBook = async (req, res) => {
    const { name, author, categoryId } = req.body;
    
    const userId = req.userData.id;
    const fileUrl = req.fileUrl
    const result = await addBook(userId, name, author, fileUrl, categoryId);
    return response.ok(res, result);
}

module.exports.getAllbookByUser = async (req, res) => {
    const userId = req.userData.id;
    const result = await getAllbooksOfUser(userId);
    return response.ok(res, result);
}