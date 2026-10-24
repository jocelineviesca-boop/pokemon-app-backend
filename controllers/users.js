const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(
          'Usuario no encontrado',
        );
      }

      res.send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
};
