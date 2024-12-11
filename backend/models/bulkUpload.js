const mongoose = require("mongoose");
const { Schema } = mongoose;

const bulkUploadSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId, // Assuming userId refers to the user model ObjectId
      ref: "user",
      required: true,
    },
    fileId: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    extension: { // Corrected from 'extention' to 'extension'
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "bulkUpload",
  }
);

// Define the BulkUpload model
const BulkUpload = mongoose.model("bulkUpload", bulkUploadSchema);

// Export the model
module.exports = BulkUpload;
