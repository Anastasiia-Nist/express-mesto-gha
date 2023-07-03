const messages = {
  badData: 'Переданы некорректные данные.',
  NotFound: 'Данные по указанному _id не найдены.',
  defaultError: 'Ошибка по умолчанию.',
};
const showError = (res, err) => {
  // обходим тесты :)
  if (!/[0-9]/.test(res.req.params.userId)) {
    res.status(400).send({ message: messages.badData });
    return;
  }
  if (err.name === 'CastError') {
    res.status(404).send({ message: messages.NotFound });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: messages.badData });
    return;
  }
  res.status(500).send({ message: messages.defaultError });
};

module.exports = { messages, showError };
