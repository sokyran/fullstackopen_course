const listHelper = require('../utils/list_helper');

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('only one blog post', () => {
    const oneBlog = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
      },
    ];

    const result = listHelper.totalLikes(oneBlog);

    expect(result).toBe(7);
  });

  test('of big list of blogs', () => {
    const result = listHelper.totalLikes(blogs);

    expect(result).toBe(36);
  });

  test('zero blogs must contain zero likes', () => {
    const result = listHelper.totalLikes([]);

    expect(result).toBe(0);
  });
});

describe('favorite Blog', () => {
  test('many blogs', () => {
    const expectedBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(expectedBlog);
  });

  test('zero blogs', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual(null);
  });

  test('one blog', () => {
    const oneBlog = [
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url:
          'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0,
      },
    ];

    const result = listHelper.favoriteBlog(oneBlog);

    expect(result).toEqual({
      title: 'First class tests',
      author: 'Robert C. Martin',
      likes: 10,
    });
  });
});

describe('most blogs', () => {
  test('many blogs', () => {
    const result = listHelper.mostBlogs(blogs);

    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });

  test('zero blogs', () => {
    const result = listHelper.mostBlogs([]);

    expect(result).toEqual(null);
  });

  test('one blog', () => {
    const oneBlog = [
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url:
          'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0,
      },
    ];

    const result = listHelper.mostBlogs(oneBlog);

    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 1 });
  });
});

describe('most likes', () => {
  test('many blogs', () => {
    const result = listHelper.mostLikes(blogs);

    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });

  test('zero blogs', () => {
    expect(listHelper.mostLikes([])).toEqual(null);
  });
});
