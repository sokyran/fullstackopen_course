import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setVisibilityHide,
  setVisibilityShow,
} from '../reducers/visibilityReducer'

const Togglable = ({ children, showText, hideText }) => {
  const visible = useSelector((state) => state.visibility)
  const dispatch = useDispatch()

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  return (
    <div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={() => dispatch(setVisibilityHide())}>
          {hideText}
        </button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={() => dispatch(setVisibilityShow())}>
          {showText}
        </button>
      </div>
    </div>
  )
}

Togglable.displayName = 'Togglable'

export default Togglable
