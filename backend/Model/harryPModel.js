const { default: mongoose } = require("mongoose");
const eventSchema = new mongoose.Schema({
  href: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
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
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("story_hp", eventSchema);
