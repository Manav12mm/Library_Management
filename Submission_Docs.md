# AI Driven Full Stack Development - Backend Submission 

**Case Study**: Web-based Library Management System Backend
**Technologies**: Node.js, Express, MongoDB
**Fields**: ID, Title, Author, ISBN, Genre, Publisher, PublicationYear, TotalCopies, AvailableCopies, ShelfLocation, BookType, Status

---

## 1. Code
Below are the key files of the backend implementation.

### `server.js`
```javascript
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const errorHandler = require("./middleware/errorHandler");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/books", bookRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### `models/Book.js`
```javascript
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Title is required"] },
    isbn: { type: String, required: [true, "ISBN is required"], unique: true },
    author: { type: String, required: [true, "Author is required"] },
    totalCopies: { 
        type: Number, 
        required: [true, "Total Copies is required"], 
        min: [1, "Total Copies must be a positive number"] 
    },
    genre: { type: String, required: [true, "Genre is required"] },
    publisher: { type: String, required: [true, "Publisher is required"] },
    status: { type: String, default: "Available" },
    publicationYear: Number,
    availableCopies: Number,
    shelfLocation: String,
    bookType: String
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
```

### `controllers/bookController.js`
```javascript
const Book = require("../models/Book");

exports.createBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) { next(error); }
};

exports.getBooks = async (req, res, next) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) { next(error); }
};

exports.searchBook = async (req, res, next) => {
    try {
        const title = req.query.title;
        const books = await Book.find({ title: { $regex: title, $options: "i" } });
        res.status(200).json(books);
    } catch (error) { next(error); }
};

exports.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json(book);
    } catch (error) { next(error); }
};

exports.updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json(book);
    } catch (error) { next(error); }
};

exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json({ message: "Book deleted" });
    } catch (error) { next(error); }
};
```

### `routes/bookRoutes.js`
```javascript
const express = require("express");
const router = express.Router();
const { createBook, getBooks, getBookById, updateBook, deleteBook, searchBook } = require("../controllers/bookController");

router.route("/search").get(searchBook);
router.route("/").post(createBook).get(getBooks);
router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);

module.exports = router;
```

---

## 2. Code Output (Terminal Terminal)
*(Paste a screenshot of your terminal showing successful start below)*

**Expected output:**
```
MongoDB Connected: <cluster details>
Server running on port 5000
```

---

## 3. Postman All HTTPS Request Examples
*(Paste Postman screenshots for the following requests below)*

- **POST /books** (Add Book)
- **GET /books** (Get All)
- **GET /books/search?title=...** (Search Book)
- **GET /books/:id** (Get by ID)
- **PUT /books/:id** (Update Book)
- **DELETE /books/:id** (Delete Book)

---

## 4. MongoDB Book Storage Part
*(Paste a screenshot of MongoDB Atlas Data Explorer showing your books collection)*

---

## 5. Deployment / Required Links
**GitHub Repository:** `[Insert your GitHub Repo Link Here]`
**Render Deployment URL:** `[Insert your Render URL Here]`

*(Paste a screenshot of the Render deployment successful screen here)*
