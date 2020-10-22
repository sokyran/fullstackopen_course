const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ username: body.username });

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);
  if (!user || !passwordCorrect) {
    return res.status(401).json({ error: 'invalid credentials' });
  }

  const userForToken = {
    username: body.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res
    .status(201)
    .json({ token, username: body.username, name: user.name, id: user.id });
});

module.exports = loginRouter;
