const db = require('../../models/index');

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

exports.getAllCategory = async (userId) => {
  const data = await db.category.find({
    userId,
  });
  return {
    data: data,
    error: false,
    result: 'category created successfull'
  };
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
