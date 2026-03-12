const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    isbn: {
        type: String,
        required: [true, "ISBN is required"],
        unique: true
    },
    author: {
        type: String,
        required: [true, "Author is required"]
    },
    totalCopies: {
        type: Number,
        required: [true, "Total Copies is required"],
        min: [1, "Total Copies must be a positive number"]
    },
    genre: {
        type: String,
        required: [true, "Genre is required"]
    },
    publisher: {
        type: String,
        required: [true, "Publisher is required"]
    },
    status: {
        type: String,
        default: "Available"
    },
    // Additional fields from the functional requirements
    publicationYear: Number,
    availableCopies: Number,
    shelfLocation: String,
    bookType: String
}, {
    timestamps: true
});

module.exports = mongoose.model("Book", bookSchema);
