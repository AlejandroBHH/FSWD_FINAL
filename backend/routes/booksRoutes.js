const router = require("express").Router();
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../Controller/booksController");

const verifyToken = require("../middlewares/auth");

router.get("/", verifyToken, getBooks);
router.post("/book", verifyToken, createBook);
router.patch("/:id", verifyToken, updateBook);
router.delete("/:id", verifyToken, deleteBook);

module.exports = router;
