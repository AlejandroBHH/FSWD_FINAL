const router = require("express").Router();
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  getCreatedBooks,
} = require("../Controller/book");

const verifyToken = require("../middlewares/auth");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // The folder where uploaded files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name with timestamp
  },
});

const upload = multer({ storage: storage });

router.get("/", verifyToken, getBooks);
router.post("/book", upload.single("image"), verifyToken, createBook);
router.patch("/:id", verifyToken, updateBook);
router.delete("/delete-books", verifyToken, deleteBook);
router.get("/created-books", verifyToken, getCreatedBooks);
router.put("/edit-books", upload.single("image"), verifyToken, updateBook);

module.exports = router;
