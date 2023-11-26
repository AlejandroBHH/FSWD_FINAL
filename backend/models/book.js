const { default: mongoose } = require("mongoose");
const eventSchema = new mongoose.Schema({
  href: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  words: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: false,
  },
  source: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model("Book", eventSchema);
