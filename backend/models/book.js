const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId, // Assuming userId refers to the user model ObjectId
            ref: "user",
            required: true,
        },
        categoryId: {
            type: Schema.Types.ObjectId, // Assuming userId refers to the user model ObjectId
            ref: "category",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: false,
        },
        fileUrl: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        collection: "category",
    }
);

// Define the BulkUpload model
const Book = mongoose.model("book", bookSchema);

// Export the model
module.exports = Book;
