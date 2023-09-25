const bson = require("bson");
const { default: mongoose } = require("mongoose");
const favoriteSchema = new mongoose.Schema({
  href: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  story_id: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Favorite", favoriteSchema);
