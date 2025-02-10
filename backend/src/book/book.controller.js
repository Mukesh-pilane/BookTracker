const response = require('../../utils/response');
const { addBook, getAllBooks, updateBook } = require('./book.service');

module.exports.createBook = async (req, res) => {
    const { name, author, categoryId } = req.body;

    const userId = req.userData.id;
    const fileUrl = req.fileUrl
    const imageUrl = req.imageUrl
    const result = await addBook(userId, name, author, fileUrl, imageUrl, categoryId);
    return response.ok(res, result);
}

module.exports.editBook = async (req, res) => {
    const userId = req.userData.id;
    const { bookId } = req.params;
    const { name, author, categoryId } = req.body;
    const result = await updateBook(userId, bookId, { name, author, categoryId });
    return response.ok(res, result);
}

module.exports.getBooks = async (req, res) => {
    const { 
        pageNo = 1, 
        perPage = 10, 
        search = "", 
        sort = { createdAt: -1 }, 
        searchFilters = ["name", "category", "author"] 
    } = req.query;

    const pageNoNumber = Number(pageNo);
    const perPageNumber = Number(perPage);

    const userId = req.userData.id;
    const result = await getAllBooks(userId, pageNoNumber, perPageNumber, search, sort, searchFilters);
    
    return response.ok(res, result);
}
