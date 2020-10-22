import React, { useState } from 'react'
import loginService from '../services/login'

const Login = ({ setUser, makeMessage, setColor }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const result = await loginService.login({ username, password })
      setUsername('')
      setPassword('')
      setUser(result)
      window.localStorage.setItem('loggedUser', JSON.stringify(result))
    } catch (err) {
      setColor('red')
      setPassword('')
      makeMessage('Wrong login or password')
    }
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
