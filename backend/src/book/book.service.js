const db = require('../../models/index');
const { toObjectId } = require('../../utils/toObjectId');


exports.addBook = async (userId, name, author, fileUrl, imageUrl, categoryId) => {
  const data = await db.book.create({
    userId,
    name,
    author,
    fileUrl,
    imageUrl,
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



exports.searchBooksOfUser = async (userId, filters = {}) => {
  let query = {};

  query.userId = toObjectId(userId); // Ensure it's an ObjectId

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
  const data = await db.book.aggregate([
    { $match: query },  // Match the query if needed
    {
      $lookup: {
        from: "category",  // The collection you want to join (assuming 'categories' is the name of the category collection)
        localField: "categoryId",  // The field from the current collection (book) that references the 'categories' collection
        foreignField: "_id",  // The field in the 'categories' collection that the localField references
        as: "categoryData"  // Alias for the result of the join
      }
    },
    {
      $unwind: "$categoryData"  // Unwind to flatten the categoryData array into a single object
    },
    {
      $project: {
        id: 1,
        userId: 1,
        category: "$categoryData.category",  // Rename 'categoryId' to 'category' and select the 'category' field
        categoryId: "$categoryData._id",
        name: 1,
        author: 1,
        fileUrl: 1,
        imageUrl:1,
        createdAt: 1,
        updatedAt: 1,
      }
    }
  ]);


  return {
    data: data,
    error: false,
    result: 'Books fetched successfully'
  };
};


