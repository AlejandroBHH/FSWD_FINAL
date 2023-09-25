const Favorite = require("../Model/favoriteModel");
const User = require("../Model/loginModel");
const Book = require("../Model/booksModel");

const markOrUnmarkFavorite = async (req, res) => {
  try {
    const { user_email, story_id, title, href } = req.body;

    // Buscar al usuario en la base de datos por su correo electrónico
    const user = await User.findOne({ email: user_email });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        data: null,
        error: "User not found",
      });
    }

    console.log("User found:", user);

    // Verificar si la historia ya está marcada como favorita por el usuario
    const existingFavorite = await Favorite.findOne({
      user_email: user_email,
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
        user_email: user_email,
        story_id: story_id,
        title: title,
        href: href,
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
    const { user_email } = req.query;

    // Buscar al usuario en la base de datos por su correo electrónico
    const user = await User.findOne({ email: user_email });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        data: null,
        error: "User not found",
      });
    }

    // Buscar todas las historias marcadas como favoritas por el usuario
    const favoriteStories = await Favorite.find({
      user_email: user_email,
    });

    // Obtener los detalles completos de las historias usando los IDs almacenados en los favoritos, agregamos el promise.all para obtener los datos de todo el array
    const favoriteStoriesWithDetails = await Promise.all(
      favoriteStories.map(async (favorite) => {
        const story = await Book.findById(favorite.story_id);
        return {
          _id: story._id,
          title: story.title,
          href: story.href,
          // Otros campos de la historia que quieras incluir
        };
      })
    );

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
