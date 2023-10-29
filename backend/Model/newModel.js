const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authorID: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Esto establece la fecha de creación automáticamente
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Puedes almacenar la URL de la imagen aquí
  },
});

module.exports = mongoose.model("new_storie", eventSchema);
