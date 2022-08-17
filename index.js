const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
//const path = require("path");
require("dotenv").config({
  path: ".env",
});

//* Crear el servidor de express
const app = express();

//* Base de datos
dbConnection();

//* CORS
app.use(cors());

//* Directorio Público
app.use(express.static("public"));

//* Lectura y parseo del body
app.use(express.json());

//* Rutas
// TODO: auth // crear, login, renew
app.use("/api/auth", require("./routes/auth"));
// TODO: CRUD: Event
app.use("/api/events", require("./routes/events"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//* Ecuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
