const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");

const JWT_SECRET =
  process.env.JWT_SECRET || "dev-secret";

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(
  new UnauthorizedError(
    "Autorización requerida"
  )
);
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    req.user = payload;

    return next();
  } catch (error) {
    return next(
  new UnauthorizedError(
    "Token inválido"
  )
);
  }
};