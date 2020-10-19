const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, current) => {
    return (sum += current.likes);
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) return null;

  const favBlog = !blogs.length
    ? {}
    : blogs.reduce((prev, current) => {
        return prev.likes > current.likes ? prev : current;
      });
  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return null;
  const count = _.countBy(blogs, 'author');
  const mostAuthor = Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );
  return {
    author: mostAuthor,
    blogs: count[mostAuthor],
  };
};

const mostLikes = (blogs) => {
  if (!blogs.length) return null;

  let output = _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, 'likes'),
    }))
    .maxBy('likes');
  return output;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
