import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef(({ children, showText, hideText }, ref) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={() => setVisible(false)}>{hideText}</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>{showText}</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
