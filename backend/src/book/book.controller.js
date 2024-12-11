const response = require('../../utils/response');
const { addBook } = require('./book.service');
const { BadRequestError } = require('../../utils/customError');

module.exports.createBook = async (req, res) => {
    const { name, author, categoryId } = req.body;
    if(!name){
        throw new BadRequestError('please fill the name');
    }
    const userId = req.userData.id;
    const fileUrl = req.fileUrl
    console.log("fielUrl", fileUrl)
    console.log("in createbook route");
    const result = await addBook(userId, name, author, fileUrl, categoryId);
    return response.ok(res, result);
}