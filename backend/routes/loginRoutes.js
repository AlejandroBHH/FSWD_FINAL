// Importar el loginController y generar las rutas para el registro y el inicio de sesión
const loginController = require("../Controller/loginController");
const verifyToken = require("../middlewares/auth");
const router = require("express").Router();

// Endpoint para el registro de usuarios
router.post("/signup", loginController.register);

// Endpoint para el inicio de sesión de usuarios
router.post("/login", loginController.login);

// Endpoint para refrescar el token
router.post("/refresh", verifyToken, loginController.refreshToken);

// Ruta para token temporal para cambio de contraseña
router.post("/resetpassword", loginController.generateTemporaryToken);

// Endpoint para actualizar los datos del usuario
router.put("/update-user-data", verifyToken, loginController.updateUserData);

// Endpoint para obtener los datos del usuario
router.get("/get-user-data", verifyToken, loginController.getUserData);

module.exports = router;
