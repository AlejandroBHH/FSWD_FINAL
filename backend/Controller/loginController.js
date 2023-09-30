// Importar la librería bcrypt para encriptar las contraseñas
const bcrypt = require("bcrypt");

// Importar el modelo que valida los datos del body
const Login = require("../Model/loginModel");

// Importar las funciones para mockear las fechas y generar los tokens
const { generateTokens } = require("../lib/utils");

// Controlador para la ruta POST /auth/register
const register = async (req, res) => {
  try {
    // Obtener los datos del body
    const { name, email, password, role } = req.body;

    // Generar el hash de la contraseña utilizando bcrypt
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario con los datos proporcionados
    const newUser = new Login({
      name,
      email,
      password: passwordHash,
      role,
      isActive: false,
    });

    // Guardar el nuevo usuario en la base de datos
    const user = await newUser.save();
    console.log(user);
    // Generar el token incluyendo el ID, email y role en el payload
    const payload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    console.log("Payload:", payload);
    const token = generateTokens(payload, false);
    console.log("Token:", token);

    // Generar el token de refresco
    const refreshToken = generateTokens(payload, true);
    console.log("Refresh Token:", refreshToken);

    // Enviar la respuesta con el usuario, token y token de refresco
    res.status(201).json({
      status: "succeeded",
      data: { user, token, refreshToken },
      error: null,
    });
  } catch (error) {
    if (error.code == 11000) {
      console.log("Clave duplicada");
      return res.status(409).json({
        status: "failed",
        data: null,
        error:
          "You are trying to register an existing email. Please choose a new email and try again.",
      });
    } else {
      res.status(400).json({
        status: "failed",
        data: null,
        error: error.message,
      });
    }
  }
};

const login = async (req, res) => {
  try {
    // Obtener los datos del body
    const { email, password } = req.body;
    // Buscar al usuario en la base de datos
    const user = await Login.findOne({ email });
    // Si no existe, enviar error
    if (!user) {
      return res.status(404).json({
        status: "failed",
        data: null,
        error: "Wrong email or password, please try again",
      });
    }
    // Obtener el hash de la contraseña almacenada en la base de datos
    const storedPasswordHash = user.password;
    console.log(storedPasswordHash);
    console.log(password);

    // Verificar si la contraseña proporcionada coincide con el hash almacenado
    const isPasswordValid = await bcrypt
      .compare(password, storedPasswordHash)
      .then((isMatch) => {
        if (isMatch) {
          console.log("Contraseña válida. El usuario puede iniciar sesión.");
        } else {
          console.log(
            "Contraseña incorrecta. El usuario no puede iniciar sesión."
          );
        }
      })
      .catch((err) => {
        console.error("Error al comparar contraseñas:", err);
      });

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "failed",
        data: null,
        error: "Incorrect password, please try again",
      });
    }

    // Si la contraseña es correcta, generamos el token
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = generateTokens(payload, false);

    // Generar el token de refresco
    const refreshToken = generateTokens(payload, true);

    await user.save();

    // Enviar el token
    res.status(200).json({
      status: "succeeded",
      data: { user, token, refreshToken },
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

//GET /auth/refresh-token
const refreshToken = async (req, res) => {
  try {
    //si no hay payload desde el token de refresco enviamos un error
    if (!req.user) {
      return res.status(403).json({
        status: "failed",
        data: null,
        error: "Unauthorized",
      });
    }
    // si hay token de refresco y no ha expirado, obtenemos payload y creamos 2 nuevos tokens
    const payload = {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    };
    res.status(200).json({
      status: "succeeded",
      data: {
        user: payload,
        token: generateTokens(payload, false),
        refreshToken: generateTokens(payload, true),
      },
      error: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      data: null,
      error: err.message,
    });
  }
};

//generar un token temporal para el cambio de contraseña en el caso de tener el email en la BBDD para el forgetPassword
const generateTemporaryToken = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const user = await Login.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Genera un token temporal con un tiempo de expiración corto
    const token = generateTokens({ email }, false); // Cambia a isRefreshToken a false

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error al generar el token temporal back:", error);
    res.status(500).json({
      error: "Ha ocurrido un error al generar el token temporal back 500",
    });
  }
};

// Controlador para el endpoint PUT /auth/update-user-data
const updateUserData = async (req, res) => {
  try {
    // Obtener el ID del usuario autenticado desde el token
    const userId = req.user.id;
    const userEmail = req.user.email;
    console.log(userId);
    console.log(userEmail);
    let user;

    if (userId) {
      // Buscar al usuario en la base de datos por su ID
      user = await Login.findById(userId);

      if (!user) {
        return res.status(404).json({
          status: "failed",
          data: null,
          error: "User not found",
        });
      }
    } else if (userEmail) {
      // Buscar al usuario en la base de datos por su email
      user = await Login.findOne({ email: userEmail });

      if (!user) {
        return res.status(404).json({
          status: "failed",
          data: null,
          error: "User not found",
        });
      }
    } else {
      return res.status(400).json({
        status: "failed",
        data: null,
        error: "Email or ID is required",
      });
    }

    // Actualizar los datos del usuario con los valores proporcionados en el cuerpo de la solicitud
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    // Actualizar la contraseña si se proporciona en el cuerpo de la solicitud
    if (req.body.newPassword) {
      // Generar el hash de la nueva contraseña utilizando bcrypt
      const newPasswordHash = await bcrypt.hash(req.body.newPassword, 10);
      user.password = newPasswordHash;
    }

    // Guardar los cambios en la base de datos
    await user.save();

    // Responder con los datos actualizados del usuario
    res.status(200).json({
      status: "succeeded",
      data: { user },
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

// Controlador para el endpoint GET /auth/get-user-data
const getUserData = async (req, res) => {
  try {
    // Obtener el ID del usuario autenticado desde el token
    const userId = req.user.id;

    // Buscar al usuario en la base de datos por su ID
    const user = await Login.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "failed",
        data: null,
        error: "User not found",
      });
    }

    // Responder con los datos del usuario
    res.status(200).json({
      status: "succeeded",
      data: { user },
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
  register,
  login,
  refreshToken,
  generateTemporaryToken,
  updateUserData,
  getUserData,
};
