const Favorite = require("../models/favorite");
const User = require("../models/user");
const Story = require("../models/stories");

const ObjectId = require("bson").ObjectId;

// Mark or unmark a story as a favorite for the user
const markOrUnmarkFavorite = async (req, res) => {
  try {
    const { story_id } = req.body;
    const id = new ObjectId(req.user.id);

    // Check if the story is already marked as a favorite by the user
    const existingFavorite = await Favorite.findOne({
      user_id: id,
      story_id: story_id,
    });

    if (existingFavorite) {
      // If it already exists, remove it from the favorites list
      await Favorite.findByIdAndDelete(existingFavorite._id);

      return res.status(200).json({
        status: "succeeded",
        data: null,
        error: null,
      });
    } else {
      // If it doesn't exist, add it to the favorites list
      const newFavorite = new Favorite({
        user_id: id,
        story_id: story_id,
      });

      await newFavorite.save();

      return res.status(200).json({
        status: "succeeded",
        data: null,
        error: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "failed",
      data: null,
      error: err.message,
    });
  }
};

// Get favorite stories for the user
const getFavoriteStories = async (req, res) => {
  try {
    const id = new ObjectId(req.user.id);
    // Find the user in the database by their id
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        data: null,
        error: "User not found",
      });
    }

    // Find all stories marked as favorites by the user
    const favoriteStories = await Favorite.find({
      user_id: id,
      story_id: { $in: await Story.find({}).distinct("_id") }, // Use the Story model
    });

    // Get complete details of the stories using the IDs stored in favorites
    const favoriteStoriesWithDetails = [];

    const getDetails = async (collection, storyId) => {
      const story = await collection.findById(storyId);
      return {
        _id: story._id,
        title: story.title,
        href: story.href,
        // Other fields of the story you want to include
      };
    };

    for (const favorite of favoriteStories) {
      favoriteStoriesWithDetails.push(
        await getDetails(Story, favorite.story_id)
      );
    }

    return res.status(200).json({
      status: "succeeded",
      data: favoriteStoriesWithDetails,
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      data: null,
      error: err.message,
    });
  }
};

module.exports = {
  markOrUnmarkFavorite,
  getFavoriteStories,
};
