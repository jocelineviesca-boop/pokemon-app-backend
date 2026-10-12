const router = require("express").Router();

const {
  getFavorites,
  createFavorite,
  deleteFavorite,
} = require("../controllers/favorites");

const {
  validateCreateFavorite,
  validateFavoriteId,
} = require("../middlewares/validation");

router.get("/", getFavorites);

router.post(
  "/",
  validateCreateFavorite,
  createFavorite
);

router.delete(
  "/:favoriteId",
  validateFavoriteId,
  deleteFavorite
);

module.exports = router;