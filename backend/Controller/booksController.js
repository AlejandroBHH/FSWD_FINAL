const ObjectId = require("bson").ObjectId;
const Book = require("../Model/booksModel");
const HarryP = require("../Model/harryPModel");
const DC = require("../Model/DCModel");
const newModel = require("../Model/newModel");

const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const eventsPerPage = 10;
    const sortField = req.query.sortField || "title"; // Campo por defecto para ordenar
    const sortOrder = req.query.sortOrder || "asc"; // Dirección por defecto de ordenación
    const modelName = req.query.modelToQuery || "HarryP"; // Nombre del modelo dinámico
    /*console.log(modelName);*/
    let History;
    if (modelName === "Book") {
      History = Book;
    } else if (modelName === "HarryP") {
      History = HarryP;
    } else if (modelName === "DC") {
      History = DC;
    } else {
      // Manejo de un modelo no válido (puedes agregar una respuesta de error apropiada aquí)
      return res.status(400).json({
        status: "failed",
        data: null,
        error: "Invalid model name",
      });
    }

    //para el buscador cambiamos el valor del title
    let filterOption = {};
    if (req.query.filterValue) {
      //filterOption.title se utiliza para buscar el valor proporcionado en req.query.filterValue en el campo title
      //filterOption.title es el campo de consulta
      filterOption.title = new RegExp(req.query.filterValue, "i");
    }

    const totalEvents = await History.countDocuments(filterOption);
    const totalPages = Math.ceil(totalEvents / eventsPerPage);

    const skip = (page - 1) * eventsPerPage;

    let sortOption = {};
    sortOption[sortField] = sortOrder === "asc" ? 1 : -1;

    //si no hay req.query.filterValue entonces  se hace el Book.find() obteniendo todos los valores
    const data = await History.find(filterOption)
      .sort(sortOption) // Ordenar según el campo y dirección especificados
      .skip(skip)
      .limit(eventsPerPage)
      .exec();

    res.status(200).json({
      status: "success",
      data,
      totalPages,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
};

const createBook = async (req, res) => {
  try {
    // Obtener los campos del formulario de la solicitud
    const { title, content, synopsis } = req.body;

    // `req.file.path` contiene la ubicación del archivo de imagen en el servidor
    const image = req.file.path;

    const author = req.user.id;
    const status = "in review";

    // Crear un nuevo libro utilizando un modelo (asegúrate de tener el modelo definido)
    const new_storie = new newModel({
      title,
      synopsis,
      content,
      image,
      author,
      status,
    });

    // Guardar el libro en la base de datos
    const savedStorie = await new_storie.save();

    res
      .status(201)
      .json({ message: "Libro creado con éxito", storie: savedStorie });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el libro" });
  }
};

const getCreatedBooks = async (req, res) => {
  try {
    const author = req.user.id; // Obtén el ID del usuario autenticado
    const createdBooks = await newModel.find({ author });

    res.status(200).json({
      status: "success",
      data: createdBooks,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await newModel.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You don't have permission to edit this book" });
    }

    // Obtén los datos del nuevo capítulo desde el cuerpo de la solicitud (req.body)
    const newChapter = {
      title: req.body.chapterTitle,
      content: req.body.chapterContent,
      // Otros campos relacionados con el capítulo
    };

    // Agrega el nuevo capítulo al array de capítulos
    newModel.chapters.push(newChapter);

    // Guarda el libro actualizado en la base de datos
    const updatedBook = await newModel.save();

    res.status(200).json({
      status: "succeeded",
      data: updatedBook,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await newModel.findOne({ author: req.user.id });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You don't have permission to delete this book" });
    }

    const deletedBook = await newModel.deleteOne({ _id: book._id });

    if (deletedBook.deletedCount === 1) {
      res.status(200).json({ status: "succeeded", data: null, error: null });
    } else {
      res.status(500).json({
        status: "failed",
        data: null,
        error: "Failed to delete the book",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  getCreatedBooks,
};
