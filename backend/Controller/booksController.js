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
    const page = parseInt(req.query.page) || 1;
    const eventsPerPage = 5;

    let createdBooks;

    if (req.query.id) {
      const StoryID = req.query.id; // Obtener el ID de la historia
      createdBooks = await newModel.findById(StoryID);
      // Puedes querer enviar una respuesta específica para la búsqueda por ID aquí
      res.status(200).json({
        status: "success",
        data: createdBooks,
        totalPages: 1, // Puedes ajustar esto según tu lógica
        error: null,
      });
      return; // Retornar temprano para evitar enviar otra respuesta más adelante
    }

    const showAllStories = req.query.showAllStories === "true";
    const filterValue = req.query.filterValue;

    let filterOption = {};

    if (filterValue) {
      filterOption.title = new RegExp(filterValue, "i");
    }

    if (showAllStories) {
      const author = req.user.id; // Obtener el ID del usuario autenticado

      const totalEvents = await newModel.countDocuments({
        author,
      });
      const totalPages = Math.ceil(totalEvents / eventsPerPage);
      const skip = (page - 1) * eventsPerPage;

      createdBooks = await newModel
        .find({ author, ...filterOption })
        .skip(skip)
        .limit(eventsPerPage)
        .exec();

      res.status(200).json({
        status: "success",
        data: createdBooks,
        totalPages,
        error: null,
      });
    } else {
      const totalEvents = await newModel.countDocuments(filterOption);
      const totalPages = Math.ceil(totalEvents / eventsPerPage);
      const skip = (page - 1) * eventsPerPage;

      createdBooks = await newModel
        .find(filterOption)
        .skip(skip)
        .limit(eventsPerPage)
        .exec();

      res.status(200).json({
        status: "success",
        data: createdBooks,
        totalPages,
        error: null,
      });
    }
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
    // Obtén el ID del libro a través de la solicitud
    const { id } = req.query;

    // Verifica si el libro existe
    const existingBook = await newModel.findById(id);
    if (!existingBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Verifica si el usuario tiene permisos para editar el libro
    if (existingBook.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You don't have permission to edit this book" });
    }

    // Actualiza los campos del libro
    existingBook.title = req.body.title;
    existingBook.synopsis = req.body.synopsis;
    existingBook.content = req.body.content;
    existingBook.image = req.file.path;

    // Guarda los cambios
    const updatedBook = await existingBook.save();

    res.status(200).json({
      status: "success",
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
