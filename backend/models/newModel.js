const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Esto establece la fecha de creación automáticamente
  },
  synopsis: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Puedes almacenar la URL de la imagen aquí
  },
});

module.exports = mongoose.model("new_storie", eventSchema);
