const Favorite = require("../models/favorite");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const getFavorites = (req, res, next) => {
  Favorite.find({
    owner: req.user._id,
  })
    .then((favorites) => {
      res.send(favorites);
    })
    .catch(next);
};

const createFavorite = (req, res, next) => {
  const {
    pokemonId,
    name,
    image,
    type,
  } = req.body;

  Favorite.create({
    pokemonId,
    name,
    image,
    type,
    owner: req.user._id,
  })
    .then((favorite) => res.status(201).send(favorite))
    .catch(next);
};

const deleteFavorite = (req, res, next) => {
  Favorite.findById(req.params.favoriteId)
    .select("+owner")
    .then((favorite) => {
      if (!favorite) {
  throw new NotFoundError(
    "Favorito no encontrado"
  );
}

      if (favorite.owner.toString() !== req.user._id) {
  throw new ForbiddenError(
    "No tienes permiso para eliminar este favorito"
  );
}

      return favorite.deleteOne().then(() => {
        res.send({
          message: "Favorito eliminado",
        });
      });
    })
    .catch(next);
};
module.exports = {
  getFavorites,
  createFavorite,
  deleteFavorite,
};