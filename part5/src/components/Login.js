import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logInAsUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Redirect } from 'react-router-dom'
import { allowRedirect } from '../reducers/userReducer'

const Login = () => {
  const dispatch = useDispatch()
  const redirect = useSelector((state) => state.user.redirect)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logInAsUser({ username, password })).catch(() => {
      setPassword('')
      dispatch(setNotification('Wrong login or password', 'red'))
    })
    setUsername('')
    setPassword('')
    dispatch(allowRedirect())
  }

  if (redirect) return <Redirect exact to="/" />

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username:{' '}
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          password:{' '}
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
