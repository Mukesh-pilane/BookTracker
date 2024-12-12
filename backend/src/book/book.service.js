const db = require('../../models/index');

exports.addBook = async (userId, name, author, fileUrl, categoryId) => {
  const data = await db.book.create({
    userId,
    name,
    author,
    fileUrl,
    categoryId
  });
  return {
    data: data,
    error: false,
    result: 'book added successfull'
  };
};

exports.getAllbooksOfUser = async (userId) => {
  const data = await db.book.find({ userId: userId })
    // .select('-userId')
    .populate("name author fileUrl categoryId")
  return {
    data: data,
    error: false,
    result: 'books fetched successfull'
  }
}