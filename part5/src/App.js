import React, { useEffect } from 'react'
import Login from './components/Login'
import Header from './components/Header'
import Message from './components/Message'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogDetails from './components/BlogDetails'
import Navigation from './components/Navigation'
import UserDetails from './components/UserDetails'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (window.localStorage.getItem('loggedUser')) {
      const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
      dispatch(setUser(loggedUser))
    }
    dispatch(initUsers())
  }, [dispatch])

  if (!Object.keys(user).length) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Message />
        <Login />
      </div>
    )
  }

  return (
    <Router>
      <Navigation />
      <Header username={user.name} />
      <Switch>
        <Route path="/users/:id" component={UserDetails} />
        <Route path="/users" component={UserList} />
        <Route path="/blogs/:id" component={BlogDetails} />
        <Route path="/">
          <div>
            <Togglable hideText="cancel" showText="create new blog">
              <BlogForm />
            </Togglable>
            <BlogList />
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
