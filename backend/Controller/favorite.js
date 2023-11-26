const Favorite = require("../models/favorite");
const User = require("../models/user");
const Story = require("../models/stories");

const ObjectId = require("bson").ObjectId;

const markOrUnmarkFavorite = async (req, res) => {
  try {
    const { story_id } = req.body;
    const id = new ObjectId(req.user.id);

    // Verificar si la historia ya está marcada como favorita por el usuario
    const existingFavorite = await Favorite.findOne({
      user_id: id,
      story_id: story_id,
    });

    if (existingFavorite) {
      // Si ya existe, eliminarlo de la lista de favoritos
      await Favorite.findByIdAndDelete(existingFavorite._id);

      return res.status(200).json({
        status: "succeeded",
        data: null,
        error: null,
      });
    } else {
      // Si no existe, agregarlo a la lista de favoritos
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

const getFavoriteStories = async (req, res) => {
  try {
    const id = new ObjectId(req.user.id);
    // Buscar al usuario en la base de datos por su id
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        data: null,
        error: "User not found",
      });
    }

    // Buscar todas las historias marcadas como favoritas por el usuario
    const favoriteStories = await Favorite.find({
      user_id: id,
      story_id: { $in: await Story.find({}).distinct("_id") }, // Usar el modelo Story
    });

    // Obtener los detalles completos de las historias usando los IDs almacenados en los favoritos
    const favoriteStoriesWithDetails = [];

    const getDetails = async (collection, storyId) => {
      const story = await collection.findById(storyId);
      return {
        _id: story._id,
        title: story.title,
        href: story.href,
        // Otros campos de la historia que quieras incluir
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
