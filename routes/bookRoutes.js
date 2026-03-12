const express = require("express");
const router = express.Router();
const {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    searchBook
} = require("../controllers/bookController");

router.route("/search").get(searchBook);
router.route("/").post(createBook).get(getBooks);
router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);

module.exports = router;
