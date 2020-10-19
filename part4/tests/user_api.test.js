const User = require('../models/user');
const app = require('../app');
const supertest = require('supertest');
const _ = require('lodash');

const api = supertest(app);

let testUser = { username: 'Hello', name: 'World', password: '123123123' };

beforeEach(async () => {
  await User.deleteMany({});
});

describe('user tests', () => {
  test('username and password are required', async () => {
    const noUsername = _.omit(testUser, 'username');
    await api.post('/api/users').send(noUsername).expect(400);

    const noPassword = _.omit(testUser, 'password');
    await api.post('/api/users').send(noPassword).expect(400);
  });

  test('username must be unique', async () => {
    const sameUser = { ...testUser, password: 'newpass', name: 'Another' };

    await api.post('/api/users').send(testUser).expect(200);
    await api.post('/api/users').send(sameUser).expect(400);
  });
});
