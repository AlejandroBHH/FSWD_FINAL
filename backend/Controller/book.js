const newModel = require("../models/newModel");
const Story = require("../models/stories");

// Get a paginated list of books based on filters
const getBooks = async (req, res) => {
  try {
    // Parse query parameters
    const page = parseInt(req.query.page) || 1;
    const eventsPerPage = 10;
    const sortField = req.query.sortField || "title";
    const sortOrder = req.query.sortOrder || "asc";
    const modelName = req.query.modelToQuery || "HarryP";

    // Map model names to typehistory values
    let typehistory;
    if (modelName === "Worm") {
      typehistory = "W";
    } else if (modelName === "HarryP") {
      typehistory = "HP";
    } else if (modelName === "DC") {
      typehistory = "DC";
    } else if (modelName === "Marvel") {
      typehistory = "MV";
    } else {
      return res.status(400).json({
        status: "failed",
        data: null,
        error: "Invalid model name",
      });
    }

    // Define filter options based on query parameters
    let filterOption = {};
    if (req.query.SourceValue) {
      filterOption.source = new RegExp(req.query.SourceValue, "i");
    }

    if (req.query.filterValue) {
      filterOption.title = new RegExp(req.query.filterValue, "i");
    }

    // Add the type filter
    filterOption.type = typehistory;

    // Count total events based on filter options
    const totalEvents = await Story.countDocuments(filterOption);
    const totalPages = Math.ceil(totalEvents / eventsPerPage);
    const skip = (page - 1) * eventsPerPage;

    // Define sort options based on query parameters
    let sortOption = {};
    sortOption[sortField] = sortOrder === "asc" ? 1 : -1;

    // Retrieve paginated books from the database
    const data = await Story.find(filterOption)
      .sort(sortOption)
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

// Create a new book
const createBook = async (req, res) => {
  try {
    // Get form fields from the request
    const { title, content, synopsis } = req.body;

    // `req.file.path` contains the location of the image file on the server
    const image = req.file.path;

    const author = req.user.id;
    const status = "in review";

    // Create a new book using a model (ensure you have the model defined)
    const new_storie = new newModel({
      title,
      synopsis,
      content,
      image,
      author,
      status,
    });

    // Save the book to the database
    const savedStorie = await new_storie.save();

    res
      .status(201)
      .json({ message: "Book created successfully", storie: savedStorie });
  } catch (error) {
    res.status(500).json({ error: "Error creating the book" });
  }
};

// Get paginated list of books created by the user
const getCreatedBooks = async (req, res) => {
  try {
    // Parse query parameters
    const page = parseInt(req.query.page) || 1;
    const eventsPerPage = 5;

    let createdBooks;

    if (req.query.id) {
      // Retrieve a specific book by ID
      const StoryID = req.query.id;
      createdBooks = await newModel.findById(StoryID);
      res.status(200).json({
        status: "success",
        data: createdBooks,
        totalPages: 1,
        error: null,
      });
      return;
    }

    // Check if all stories or specific user stories are requested
    const showAllStories = req.query.showAllStories === "true";
    const filterValue = req.query.filterValue;

    let filterOption = {};

    if (filterValue) {
      filterOption.title = new RegExp(filterValue, "i");
    }

    if (showAllStories) {
      // Get user's ID for retrieving specific user stories
      const author = req.user.id;
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
      // Get all stories with pagination
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

// Update an existing book
const updateBook = async (req, res) => {
  try {
    // Get the book ID from the request
    const { id } = req.query;

    // Check if the book exists
    const existingBook = await newModel.findById(id);
    if (!existingBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Check if the user has permission to edit the book
    if (existingBook.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You don't have permission to edit this book" });
    }

    // Update book fields
    existingBook.title = req.body.title;
    existingBook.synopsis = req.body.synopsis;
    existingBook.content = req.body.content;

    // Check for a new attached file
    if (req.file && req.file.path) {
      existingBook.image = req.file.path;
    }

    // Save the changes
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

// Delete a book
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
