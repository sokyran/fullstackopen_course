import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Message from './components/Message'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Header from './components/Header'

const App = () => {
  const [user, setUser] = useState({})
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [color, setColor] = useState('green')

  const blogFormRef = useRef()

  useEffect(() => {
    if (window.localStorage.getItem('loggedUser')) {
      setUser(JSON.parse(window.localStorage.getItem('loggedUser')))
      blogService.setToken(user.token)
    }
  }, [user.token])

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser({})
  }

  const makeMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    const res = await blogService.create(blogObject)
    console.log(res)
    setBlogs(blogs.concat(res))
    blogFormRef.current.toggleVisibility()
  }

  const updateBlog = async (blogObject) => {
    const res = await blogService.update(blogObject)
    const newBlogs = blogs.map((blog) =>
      blog.id !== blogObject.id ? blog : res
    )
    setBlogs(newBlogs)
  }

  const removeBlog = async (blogId) => {
    await blogService.remove(blogId)
    const newBlogs = blogs.filter((blog) => blog.id !== blogId)
    setBlogs(newBlogs)
  }

  if (!Object.keys(user).length) {
    return (
      <div>
        <Header />
        <h2>Log in to application</h2>
        <Message message={message} color={color} />
        <Login
          setUser={setUser}
          makeMessage={makeMessage}
          setColor={setColor}
        />
      </div>
    )
  }

  return (
    <div>
      <Header />
      <h2>Blogs</h2>
      <Message message={message} color={color} />
      <p>
        Signed in as `{user.name}`{' '}
        <button onClick={handleLogout}>logout</button>{' '}
      </p>

      <Togglable hideText="cancel" showText="create new blog" ref={blogFormRef}>
        <h3>Create new blog</h3>
        <BlogForm
          addBlog={addBlog}
          makeMessage={makeMessage}
          setColor={setColor}
        />
      </Togglable>

      <h3>Current blogs</h3>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          userId={user.id}
        />
      ))}
    </div>
  )
}

export default App
