import React from 'react'
import { useSelector } from 'react-redux'

const Message = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification.message) return null

  const messageStyle = {
    color: notification.color,
    background: 'lightgrey',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  }

  return (
    <div id="message" style={messageStyle}>
      {notification.message}
    </div>
  )
}

export default Message
