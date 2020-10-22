const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const decodedToken = jwt.decode(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token is missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog(req.body)
  if (!blog.likes) blog.likes = 0

  blog.user = user.id

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const finalObj = {
    ...savedBlog.toJSON(),
    user: { username: user.username, name: user.name, id: user.id },
  }

  res.status(201).json(finalObj)
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id,
  }

  const result = await Blog.findByIdAndUpdate(id, updatedBlog).populate('user')
  res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  // user data from jwt
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'no token or wrong token provided' })
  }

  // blog to delete
  console.log(id)
  const blog = await Blog.findById(id)

  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  // possible owner of blog
  const user = await User.findById(decodedToken.id)

  if (blog.user.toString() !== user.id.toString()) {
    return res.status(400).json({ error: 'you dont own this blog' })
  }

  user.blogs = user.blogs.filter((b) => b.toString() !== blog.id)
  await user.save()
  await Blog.deleteOne({ _id: id })

  return res.status(200).end()
})

module.exports = blogsRouter
