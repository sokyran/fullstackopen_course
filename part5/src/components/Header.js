import React from 'react'
import Message from './Message'
import { useDispatch } from 'react-redux'
import { clearUser } from '../reducers/userReducer'

const Header = ({ username }) => {
  const dispatch = useDispatch()
  return (
    <div>
      <h1>
        <em>Blogs</em>
      </h1>
      <Message />
      <p>
        Signed in as `{username}`{' '}
        <button onClick={() => dispatch(clearUser())}>logout</button>{' '}
      </p>
    </div>
  )
}

export default Header
