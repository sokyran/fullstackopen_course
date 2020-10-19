const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const api = supertest(app);

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

const newUser = {
  username: 'Test',
  name: 'user',
  password: '1234567890',
};

let token = '';

beforeEach(async () => {
  await User.deleteMany({});
  const responseForUser = await api.post('/api/users').send(newUser);
  const createdUser = responseForUser.body;
  const result = await api.post('/api/login').send(newUser);
  token = result.body.token;

  await Blog.deleteMany({});
  const blogsArray = initialBlogs.map((blog) => {
    let newBlog = new Blog(blog);
    newBlog.user = new mongoose.Types.ObjectId(createdUser.id);
    return newBlog;
  });
  const promisesArray = blogsArray.map((blog) => blog.save());
  await Promise.all(promisesArray);
});

describe('blog tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('valid number of blogs are returned', async () => {
    const result = await api.get('/api/blogs');

    expect(result.body).toHaveLength(initialBlogs.length);
  });

  test('valid blog is added', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: 'bearer ' + token })
      .expect(201);

    const result = await api.get('/api/blogs');
    const titles = result.body.map((blog) => blog.title);

    expect(result.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContainEqual(initialBlogs[0].title);
  });

  test('blog id is correctly defined', async () => {
    const result = await api.get('/api/blogs');
    expect(result.body[0].id).toBeDefined();
  });

  test('newly created blog has zero likes', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    };

    const result = await api
      .post('/api/blogs')
      .set({ Authorization: 'bearer ' + token })
      .send(newBlog)
      .expect(201);

    expect(result.body.likes).toBe(0);
  });

  test('bad blog is not added', async () => {
    const newBlog = {
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: 'bearer ' + token })
      .expect(400);
  });

  test('blog deleted successfully', async () => {
    const blogs = await api.get('/api/blogs');

    await api
      .delete(`/api/blogs/${blogs.body[0].id}`)
      .set({ Authorization: 'bearer ' + token })
      .expect(200);
  });

  test('blog updated successfully', async () => {
    const blogs = await api.get('/api/blogs');

    const newBlog = blogs.body[0];
    newBlog.title = 'Updated title';

    await api
      .put(`/api/blogs/${newBlog.id}`)
      .send(newBlog)
      .set({ Authorization: 'bearer ' + token })
      .expect(201);

    const updatedBlogs = await api.get('/api/blogs');
    const titles = updatedBlogs.body.map((blog) => blog.title);
    expect(titles).toContain(newBlog.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
