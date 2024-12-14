const response = require('../../utils/response');
const { addBook, getAllbooksOfUser, searchBooksOfUser, updateBook } = require('./book.service');

module.exports.createBook = async (req, res) => {
    const { name, author, categoryId } = req.body;

    const userId = req.userData.id;
    const fileUrl = req.fileUrl
    const result = await addBook(userId, name, author, fileUrl, categoryId);
    return response.ok(res, result);
}

module.exports.editBook = async (req, res) => {
    const userId = req.userData.id;
    const { bookId } = req.params;
    const { name, author, categoryId } = req.body;
    const result = await updateBook(userId, bookId, { name, author, categoryId  });
    return response.ok(res, result);
}

module.exports.getAllbookByUser = async (req, res) => {
    const userId = req.userData.id;
    const result = await getAllbooksOfUser(userId);
    return response.ok(res, result);
}

module.exports.getSearchFilter = async (req, res) => {
    const { name, author, categoryId } = req.query;
    const userId = req.userData.id;
    const result = await searchBooksOfUser(userId, { name, author, categoryId });
    return response.ok(res, result);
}