const statuses = {
  badRequest: 400,
  notFound: 404,
  default: 500,
};
const messages = {
  badData: 'Переданы некорректные данные.',
  notFound: 'Данные по указанному _id не найдены.',
  defaultError: 'Ошибка по умолчанию.',
};
const showError = (res, err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(statuses.badRequest).send({ message: messages.badData });
    return;
  }
  if (err.name === 'Error') {
    res.status(statuses.notFound).send({ message: messages.notFound });
    return;
  }
  res.status(statuses.default).send({ message: messages.defaultError });
};

module.exports = { messages, showError, statuses };
