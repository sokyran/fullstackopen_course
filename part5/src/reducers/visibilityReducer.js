const visibilityReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_SHOW':
      return true
    case 'SET_HIDE':
      return false
    default:
      return state
  }
}

export const setVisibilityShow = () => {
  return { type: 'SET_SHOW' }
}

export const setVisibilityHide = () => {
  return { type: 'SET_HIDE' }
}

export default visibilityReducer
