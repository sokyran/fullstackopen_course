const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { likes: 0 });

  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const body = req.body;

  if (!body.password || body.password.length <= 3)
    return res
      .status(400)
      .send({ error: 'Password must be longer than 3 characters' });
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

module.exports = usersRouter;
