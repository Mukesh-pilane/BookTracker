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

exports.updateBook = async (userId, bookId, updatedData) => {
  // Find the category by categoryId and userId
  const existingBook = await db.book.findOne({
      _id: bookId,
      userId: userId
  });

  // Check if the category exists
  if (!existingBook) {
    return {
      data: null,
      error: true,
      result: 'Category not found',
    };
  }

  // Update the category with the new data
  const updatedBook = await db.book.findByIdAndUpdate(
    bookId,
    updatedData,
    { new: true } // `new: true` returns the updated document
  );

  return {
    data: updatedBook, // Returning the updated category
    error: false,
    result: 'Category updated successfully',
  };

};


exports.getAllbooksOfUser = async (userId) => {
  const data = await db.book.find({ userId: userId })
    .populate("categoryId")
  return {
    data: data,
    error: false,
    result: 'books fetched successfull'
  }
}

exports.searchBooksOfUser = async (userId, filters = {}) => {
  let query = {};

  query.userId = userId; // Filter by userId (utilizing the index)
  
  // Apply filters based on the provided criteria
  if (filters.categoryId) {
    query.categoryId = filters.categoryId;
  }
  if (filters.name) {
    query.name = { $regex: filters.name, $options: 'i' }; // Case-insensitive search
  }
  if (filters.author) {
    query.author = { $regex: filters.author, $options: 'i' }; // Case-insensitive search
  }

  // Fetch the filtered books
  const data = await db.book.find(query);
  return {
    data: data,
    error: false,
    result: 'Books fetched successfully'
  };
};


