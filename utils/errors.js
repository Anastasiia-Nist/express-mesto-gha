const statuses = {
  badRequest: 400,
  notFound: 404,
  default: 500,
};
const messages = {
  badData: 'Переданы некорректные данные.',
  NotFound: 'Данные по указанному _id не найдены.',
  defaultError: 'Ошибка по умолчанию.',
};
const showError = (res, err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(statuses.badRequest).send({ message: messages.badData });
    return;
  }
  res.status(statuses.default).send({ message: messages.defaultError });
};

module.exports = { messages, showError, statuses };
