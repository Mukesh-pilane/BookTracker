const db = require('../../models/index');
const { toObjectId } = require('../../utils/toObjectId');

exports.addCategory = async (userId, category) => {
  const data = await db.category.create({
    userId,
    category
  });
  return {
    data: data,
    error: false,
    result: 'category created successfull'
  };
};


exports.getAllCategory = async (userId, pageNo = 1, perPage = 10, sort = { createdAt: -1 }, searchQuery = '') => {
  try {
    // Build the search query if provided (case-insensitive)
    let matchConditions = { userId:toObjectId(userId)};
    
    if (searchQuery) {
      matchConditions.category = { $regex: searchQuery, $options: 'i' };  // Case-insensitive search
    }

    // Pagination (skip and limit)
    const skip = (pageNo - 1) * perPage;
    const limit = perPage;

    // Start the aggregation pipeline with facet
    const data = await db.category.aggregate([
      {
        $match: matchConditions, // Match categories by userId and optional search
      },
      {
        $lookup: {
          from: 'users', // Assuming "users" is the collection name for user model
          localField: 'userId', // Field in the category schema
          foreignField: '_id', // Field in the user schema
          as: 'userDetails', // The result will be stored in "userDetails" array
        },
      },
      {
        $unwind: { 
          path: '$userDetails', 
          // preserveNullAndEmptyArrays: true, // If no matching user, category will still appear
        },
      },
      {
        $facet: {
          result: [
            { $sort: sort }, // Sorting based on the provided sort object
            { $skip: skip }, // Pagination: skip records based on pageNo
            { $limit: limit }, // Pagination: limit to perPage
          ],
          totalCount: [
            { $count: 'total' } // Count the total categories for pagination info
          ]
        }
      },
      {
        $project: {
          result: 1, // Get the categories data from the facet
          totalCount: { $arrayElemAt: ["$totalCount.total", 0] } // Get total count from facet
        }
      }
    ]);

    if (data.length === 0) {
      return {
        data: [],
        error: false,
        result: 'No categories found',
        totalCount: 0
      };
    }

    return {
      data: data[0].categories, // Return categories
      error: false,
      totalCount: data[0].totalCount || 0, // Total count for pagination
      result: 'Categories fetched successfully',
    };
  } catch (error) {
    return {
      data: [],
      error: true,
      message: error.message,
    };
  }
};


exports.updateCategory = async (userId, categoryId, updatedData) => {
  // Find the category by categoryId and userId
  const existingCategory = await db.category.findOne({
      _id: categoryId,
      userId: userId
  });

  // Check if the category exists
  if (!existingCategory) {
    return {
      data: null,
      error: true,
      result: 'Category not found',
    };
  }

  // Update the category with the new data
  const updatedCategory = await db.category.findByIdAndUpdate(
    categoryId,
    updatedData,
    { new: true } // `new: true` returns the updated document
  );

  return {
    data: updatedCategory, // Returning the updated category
    error: false,
    result: 'Category updated successfully',
  };

};
