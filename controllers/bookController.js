const Book = require("../models/Book");

// @desc    Add a new book
// @route   POST /books
exports.createBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all book records
// @route   GET /books
exports.getBooks = async (req, res, next) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

// @desc    Search book by title
// @route   GET /books/search?title=xyz
exports.searchBook = async (req, res, next) => {
    try {
        const title = req.query.title;
        if (!title) {
            return res.status(400).json({ message: "Please provide a title to search" });
        }

        const books = await Book.find({
            title: { $regex: title, $options: "i" }
        });

        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

// @desc    Get book by ID
// @route   GET /books/:id
exports.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

// @desc    Update book details
// @route   PUT /books/:id
exports.updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete book record
// @route   DELETE /books/:id
exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted" });
    } catch (error) {
        next(error);
    }
};
