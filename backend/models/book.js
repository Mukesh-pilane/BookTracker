const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId, 
            ref: "user",
            required: true,
        },
        categoryId: {
            type: Schema.Types.ObjectId,
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
        collection: "book",
    }
);
bookSchema.index({ userId: 1 });

const Book = mongoose.model("book", bookSchema);

module.exports = Book;
