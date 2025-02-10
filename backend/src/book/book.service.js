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


exports.getAllBooks = async (userId, pageNo, perPage, search, sort, searchFilters) => {
  try {
    // Build the query based on filters
    let matchConditions = {};
    matchConditions.userId = toObjectId(userId); // Ensure it's an ObjectId

    if (searchFilters.length > 0) {
      let orConditions = searchFilters.map(element => {
        if(element==="category"){
          return { [`categoryData.category`]: { $regex: search, $options: 'i' } };  
        }else{
          return { [element]: { $regex: search, $options: 'i' } };  // Case-insensitive search for each field
        }
      });

      // Use $or to search across any of the fields
      matchConditions.$or = orConditions;
    }

    console.log('matchConditions', matchConditions)
    // Pagination (skip and limit)
    const skip = (pageNo - 1) * perPage;
    const limit = perPage;

    // Start the aggregation pipeline with facet for pagination and total count
    const data = await db.book.aggregate([
      {
        $lookup: {
          from: "category",  // The collection you want to join (assuming 'categories' is the name of the category collection)
          localField: "categoryId",  // The field from the current collection (book) that references the 'categories' collection
          foreignField: "_id",  // The field in the 'categories' collection that the localField references
          as: "categoryData"  // Alias for the result of the join
        }
      },
      { $unwind: "$categoryData" },  // Unwind to flatten the categoryData array into a single object
      { $match: matchConditions },  // Match the query if needed
      {
        $facet: {
          result: [
            { $sort: sort }, // Sorting based on the provided sort object
            { $skip: skip }, // Pagination: skip records based on pageNo
            { $limit: limit }, // Pagination: limit to perPage
          ],
          totalCount: [
            { $count: 'total' } // Count the total books for pagination info
          ]
        }
      },
      {
        $project: {
          result: 1, // Get the books data from the facet
          totalCount: { $arrayElemAt: ["$totalCount.total", 0] } // Get total count from facet
        }
      }
    ]);

    if (data.length === 0 || data[0].result.length === 0) {
      return {
        data: [],
        error: false,
        result: 'No books found',
        totalCount: 0
      };
    }

    return {
      data: data[0].result, // Return books data
      error: false,
      totalCount: data[0].totalCount || 0, // Total count for pagination
      result: 'Books fetched successfully'
    };

  } catch (error) {
    return {
      data: [],
      error: true,
      message: error.message,
    };
  }
};