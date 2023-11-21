const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Esto establece la fecha de creación automáticamente
  },
  role: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});
//por defecto mongoose pluraliza el nombre, pasando de Login a la colección logins
//que es la que tenemos.
module.exports = mongoose.model("Login", loginSchema);
