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
  registerAt: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  lastLogin: {
    type: Date,
    required: true,
    default: null,
  },
});
//por defecto mongoose pluraliza el nombre, pasando de Login a la colección logins
//que es la que tenemos.
module.exports = mongoose.model("Login", loginSchema);
