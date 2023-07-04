const messages = {
  badData: 'Переданы некорректные данные.',
  NotFound: 'Данные по указанному _id не найдены.',
  defaultError: 'Ошибка по умолчанию.',
};
const showError = (res, err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ message: messages.badData });
    return;
  }
  res.status(500).send({ message: messages.defaultError });
};

module.exports = { messages, showError };
