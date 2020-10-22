import React from 'react'

const Message = ({ message, color }) => {
  if (!message) return null

  const messageStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  }

  return (
    <div id="message" style={messageStyle}>
      {message}
    </div>
  )
}

export default Message
