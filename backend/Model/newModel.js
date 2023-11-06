const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now, // Esto establece la fecha de creación automáticamente
  },
  description: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  image: {
    type: String, // Puedes almacenar la URL de la imagen aquí
  },
});

module.exports = mongoose.model("new_storie", eventSchema);
