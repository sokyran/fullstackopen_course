import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Message from './components/Message'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Header from './components/Header'
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    if (window.localStorage.getItem('loggedUser')) {
      const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
      dispatch(setUser(loggedUser))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  return (
    <Router>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            Object.keys(user).length ? (
              <div>
                <h3>Blogs</h3>
                <Message />
                <p>
                  Signed in as `{user.name}`{' '}
                  <button onClick={() => dispatch(clearUser())}>logout</button>{' '}
                </p>

                <Togglable hideText="cancel" showText="create new blog">
                  <h3>Create new blog</h3>
                  <BlogForm />
                </Togglable>

                <h3>Current blogs</h3>
                {blogs.map((blog) => (
                  <Blog key={blog.id} blog={blog} userId={user.id} />
                ))}
              </div>
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route path="/login">
          <h2>Log in to application</h2>
          <Message />
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
