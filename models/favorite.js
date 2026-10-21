const mongoose = require('mongoose');
const validator = require('validator');

const favoriteSchema = new mongoose.Schema({
  pokemonId: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'La imagen debe ser una URL válida',
    },
  },

  type: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model(
  'favorite',
  favoriteSchema,
);
