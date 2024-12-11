const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId, // Assuming userId refers to the user model ObjectId
      ref: "user",
      required: true,
    },
    category: {
      type: String,
      unique: true,
      required: true,
    }
  },
  {
    timestamps: true,
    collection: "category",
  }
);

// Define the BulkUpload model
const Category = mongoose.model("category", categorySchema);

// Export the model
module.exports = Category;
