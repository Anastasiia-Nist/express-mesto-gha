const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
        throw new Error();
      } else {
        res.send(user);
      }
    })
    .catch((err) => showError(res, err));
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new Error();
      } else {
        res.send(user);
      }
    })
    .catch((err) => showError(res, err));
};

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => showError(res, err));
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new Error();
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
        throw new Error();
      } else {
        res.send(user);
      }
    })
    .catch((err) => showError(res, err));
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, 'some-secret-key');
      // res.cookie('jwt', token, {
      //   maxAge: 3600000 * 24 * 7,
      //   httpOnly: true,
      //   sameSite: true,
      // })
      // вернём токен
      res.send({ token });
    })
    .catch(() => {
      res
        .status(401)
        .send({ message: 'Проверьте введённые почту и пароль или зарегистрируйтесь.' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  login,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
};
