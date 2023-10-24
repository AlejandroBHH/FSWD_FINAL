const bson = require("bson");
const { default: mongoose } = require("mongoose");
const favoriteSchema = new mongoose.Schema({
  story_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Favorite", favoriteSchema);
