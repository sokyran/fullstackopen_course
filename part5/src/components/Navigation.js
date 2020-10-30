import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const style = {
    display: 'flex',
    background: 'rgba(0, 153, 204, 0.9)',
    alignItems: 'stretch',
  }

  const textStyle = {
    paddingRight: '10px',
  }
  return (
    <div style={style}>
      <Link to="/">
        {' '}
        <div style={textStyle}>blogs </div>{' '}
      </Link>

      <Link to="/users">
        {' '}
        <div style={textStyle}>users</div>{' '}
      </Link>
    </div>
  )
}

export default Navigation
