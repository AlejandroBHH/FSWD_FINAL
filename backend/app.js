//Archivo principal de la aplicación, punto de entrada
//importar la librería express para crear el servidor
const express = require("express");
//importar las librerias dotenv para leer las variables de entorno
const dotenv = require("dotenv");
//importar la libreria mongoose para conectarnos a la BBDD
const mongoose = require("mongoose");
//importar la liberia cors para habilitar el acceso a la API desde cualquier origen
const cors = require("cors");
//importar las rutas
const logins = require("../backend/routes/loginRoutes");
const books = require("./routes/booksRoutes");

//leer las variables de entorno
dotenv.config();
//crear el servidor
const app = express();
//habilitar el uso del json en el body
app.use(express.json);
//habilitar el uso de cors
app.use(cors());
//conectar a la BBDD
mongoose
  .connect(process.env.DATABASE_URL, {
    //Para evitar arnings con la URL de conexión, aplica el nuevo motor de análisis de URL
    useNewUrlParser: true,
    //para evitar warnigs con la topología de la BBDD aplica el nuevo motor de detección
    //y monitoreo de servidores
    useUnifiedTopology: true,
  })
  .then(() => console.log("succefully connected to the database"))
  .catch((err) => console.log(err));
//escucha los eventos de error para maj¡nejar errores después de la conecxión
mongoose.connection.on("error", (err) => {
  console.log(err);
});
//habilitar las rutas
app.use("/auth", logins);
app.use("/library", books);

//levantar el servidor
//escucha las conexiones para el puerto (y host especificado)
//devuelve un objeto http.server

app.listen(process.env.PORT, () => {
  console.log(`server valid al http://127.0.0.1:${process.env.PORT}`);
});
