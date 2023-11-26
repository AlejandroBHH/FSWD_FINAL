// Importar el auth y generar las rutas para el registro y el inicio de sesión
const auth = require("../Controller/auth");
const verifyToken = require("../middlewares/auth");
const router = require("express").Router();

// Endpoint para el registro de usuarios
router.post("/signup", auth.signUp);

// Endpoint para el inicio de sesión de usuarios
router.post("/login", auth.login);

// Ruta para token temporal para cambio de contraseña
router.post("/resetpassword", auth.generateTemporaryToken);

// Endpoint para actualizar los datos del usuario
router.put("/update-user-data", verifyToken, auth.updateUserData);

// Endpoint para obtener los datos del usuario
router.get("/get-user-data", verifyToken, auth.getUserData);

// Endpoint para actualizar el forgotten password
router.put("/newpassword", verifyToken, auth.updateUserPassword);

module.exports = router;
