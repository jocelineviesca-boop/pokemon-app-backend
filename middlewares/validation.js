const { celebrate, Joi } = require('celebrate');

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateCreateFavorite = celebrate({
  body: Joi.object().keys({
    pokemonId: Joi.number().required(),
    name: Joi.string().required(),
    image: Joi.string().uri().required(),
    type: Joi.string().required(),
  }),
});

const validateFavoriteId = celebrate({
  params: Joi.object().keys({
    favoriteId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateCreateFavorite,
  validateFavoriteId,
};
