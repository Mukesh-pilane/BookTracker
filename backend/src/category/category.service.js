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