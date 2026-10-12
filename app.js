const express = require("express");
const mongoose = require("mongoose");

const favoritesRouter = require("./routes/favorites");
const auth = require("./middlewares/auth");
const usersRouter = require("./routes/users");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");

const {
  signup,
  signin,
} = require("./controllers/auth");

const {
  validateSignup,
  validateSignin,
} = require("./middlewares/validation");

const {
  requestLogger,
  errorLogger,
} = require("./middlewares/logger");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(requestLogger);

app.post("/signup", validateSignup, signup);
app.post("/signin", validateSignin, signin);

app.use("/users", auth, usersRouter);
app.use("/favorites", auth, favoritesRouter);

app.get("/", (req, res) => {
  res.send("Pokemon App API funcionando");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/pokemon_app")
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.error(
      "Error al conectar con MongoDB:",
      error
    );
  });

app.use(errorLogger);
  
app.use(errors());

app.use(errorHandler);  

app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en el puerto ${PORT}`
  );
});