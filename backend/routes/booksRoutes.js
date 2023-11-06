const router = require("express").Router();
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../Controller/booksController");

const verifyToken = require("../middlewares/auth");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // La carpeta donde se guardarán los archivos subidos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nombre de archivo único
  },
});

const upload = multer({ storage: storage });

router.get("/", verifyToken, getBooks);
router.post("/book", upload.single("image"), verifyToken, createBook);
router.patch("/:id", verifyToken, updateBook);
router.delete("/:id", verifyToken, deleteBook);

module.exports = router;
