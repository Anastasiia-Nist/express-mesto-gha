const User = require('../models/user');
const { messages, showError, statuses } = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(statuses.default).send({ message: messages.defaultError }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(statuses.notFound).send({ message: messages.NotFound });
      } else {
        res.send(user);
      }
    })
    .catch((err) => showError(res, err));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => showError(res, err));
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(statuses.notFound).send({ message: messages.NotFound });
      } else {
        res.send(user);
      }
    })
    .catch((err) => showError(res, err));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(statuses.notFound).send({ message: messages.NotFound });
      } else {
        res.send(user);
      }
    })
    .catch((err) => showError(res, err));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
