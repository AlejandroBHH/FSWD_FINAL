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
      registerAt,
      role,
      isActive: false,
      lastLogin,
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

//POST /auth/login
const login = async (req, res) => {
  try {
    //obtener los datos del body
    const { email, password } = req.body;
    //buscar al usuario en la base de datos
    const user = await Login.findOne({ email });
    //si no existe enviar error
    if (!user) {
      return res.status(404).json({
        status: "failed",
        data: null,
        error: "Wrong email or password, please try again",
      });
    }
    //si la contraseña es correcta generamos el token
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = generateTokens(payload, false);

    // Generar el token de refresco
    const refreshToken = generateTokens(payload, true);

    //obtener la fecha de lastLogin para generar una posterior
    const lastLoginYear = parseInt(user.lastLogin.toISOString().slice(0, 4));
    console.log(lastLoginYear);
    //actualizar la fecha del último login
    user.lastLogin = getFutureDate(lastLoginYear + 6, +lastLoginYear + 1);
    await user.save();

    //enviar el token
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

module.exports = {
  register,
  login,
  refreshToken,
};
