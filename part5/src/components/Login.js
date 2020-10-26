import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logInAsUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Redirect } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logInAsUser({ username, password })).catch(() => {
      setPassword('')
      dispatch(setNotification('Wrong login or password', 'red'))
    })
    setUsername('')
    setPassword('')

    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to="/" />
  }

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
