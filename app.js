// для консольлогов использовать 'eslint-disable-next-line no-console'
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const { createUser, login } = require('./controllers/users');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { statuses } = require('./utils/errors');
const authMiddleware = require('./middlewares/auth');

const app = express();

// параметры Express Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
// защита приложения от некоторых широко известных веб-уязвимостей
app.use(helmet());
// ограничение кол-во запросов. Для защиты от DoS-атак.
app.use(limiter);

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
// app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', authMiddleware, usersRouter);
app.use('/cards', authMiddleware, cardsRouter);

app.use((req, res) => {
  res.status(statuses.notFound).send({ message: 'Страница не найдена' });
});

app.listen(3000);
