const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const UnauthorizedError = require("../errors/UnauthorizedError");
const ConflictError = require("../errors/ConflictError");

const JWT_SECRET =
  process.env.JWT_SECRET || "dev-secret";

const signup = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name,
      })
    )
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        return next(
          new ConflictError(
            "Ya existe un usuario con ese correo electrónico"
          )
        );
      }

      return next(error);
    });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
  throw new UnauthorizedError(
    "Correo electrónico o contraseña incorrectos"
  );
}

      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          
          if (!matched) {
  throw new UnauthorizedError(
    "Correo electrónico o contraseña incorrectos"
  );
}

          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            {
              expiresIn: "7d",
            }
          );

          res.send({ token });
        });
    })
    .catch(next);
};

module.exports = {
  signup,
  signin,
};