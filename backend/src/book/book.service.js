const db = require('../../models/index');

exports.addBook = async (userId, name, author, fileUrl) => {
  const data = await db.book.create({
    userId,
    name,
    author,
    fileUrl
  });
  return {
    data: data,
    error: false,
    result: 'category created successfull'
  };
};