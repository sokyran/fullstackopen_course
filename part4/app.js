const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const {
  unknownEndpoint,
  errorHandler,
  tokenHandler,
} = require('./utils/middleware');

const app = express();

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('Connection to database is successful');
  })
  .catch((e) => {
    logger.error(e);
  });

app.use(cors());
app.use(express.json());
app.use(tokenHandler);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(unknownEndpoint);
app.use(errorHandler);
module.exports = app;
