const router = require("express").Router();
const {
  markOrUnmarkFavorite,
  getFavoriteStories,
} = require("../Controller/favorite");

const verifyToken = require("../middlewares/auth");

router.post("/", verifyToken, markOrUnmarkFavorite);
router.get("/get-favorites", verifyToken, getFavoriteStories);

module.exports = router;
