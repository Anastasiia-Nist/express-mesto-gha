const messages = {
  badData: 'Переданы некорректные данные.',
  NotFound: 'Данные по указанному _id не найдены.',
  defaultError: 'Ошибка по умолчанию.',
};
const showError = (res, err) => {
  if (err.name === 'CastError') {
    res.status(404).send(messages.NotFound);
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(400).send(messages.badData);
    return;
  }
  res.status(500).send(messages.defaultError);
};

module.exports = { messages, showError };
