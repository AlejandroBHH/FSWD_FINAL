// Archivo principal de la aplicación, punto de entrada
// Importar la librería express para crear el servidor
const express = require("express");
// Importar la librerías dotenv para leer las variables de entorno
const dotenv = require("dotenv");
// Importar la librería mongoose para conectarnos a la BBDD
const mongoose = require("mongoose");
// Importar la librería cors para habilitar el acceso a la API desde cualquier origen
const cors = require("cors");
//importar las rutas
const logins = require("../backend/routes/loginRoutes");
const books = require("./routes/booksRoutes");
const favorites = require("../backend/routes/favoriteRoutes");

const fs = require("file-system");

// Importa tu middleware verifyToken
const verifyToken = require("../backend/middlewares/auth");
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;

// Configura Passport con la estrategia Bearer
passport.use(
  new BearerStrategy((token, done) => {
    // Aquí se verifica el token de portador.
    // Luego, se utiliza el middleware verifyToken para validar el token JWT.
    verifyToken(
      { header: () => ({ "auth-token": token }) }, // Simulación de req para verifyToken
      null,
      (error, user) => {
        if (error) {
          return done(null, false); // El token no es válido
        } else {
          return done(null, user); // El token es válido y proporciona el objeto de usuario si es necesario
        }
      }
    );
  })
);

// Inicializa Passport
passport.initialize();

// Leer las variables de entorno
dotenv.config();
// Crear el servidor
const app = express();

// Habilitar el uso del json en el body
app.use(express.json());
// Habilitar el uso de cors
app.use(cors({ origin: "http://localhost:3000" }));

// Conectar a la BBDD
mongoose
  .connect(process.env.DATABASE_URL, {
    // Para evitar warnings con la URL de conexión, aplica el nuevo motor de análisis de URL
    useNewUrlParser: true,
    // Para evitar warnings con la topología de la BBDD, aplica el nuevo motor de detección
    // y monitoreo de servidores
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to the database"))
  .catch((err) => console.log(err));
// Escuchar los eventos de error para manejar errores después de la conexión
mongoose.connection.on("error", (err) => {
  console.log(err);
});
//habilitar las rutas
app.use("/auth", logins);
app.use("/library", books);
app.use("/", favorites);

// Levantar el servidor
// Escucha las conexiones para el puerto (y host) especificado
// Devuelve un objeto http.server
app.listen(process.env.PORT, () => {
  console.log(`Server valid at http://127.0.0.1:${process.env.PORT}`);
});
