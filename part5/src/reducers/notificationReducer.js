const notificationReducer = (
  state = { message: '', timeoutId: 0, color: 'green' },
  action
) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.data.message,
        timeoutId: action.data.timeoutId,
        color: action.data.color,
      }
    default:
      return state
  }
}

export const setNotification = (message, color) => {
  return async (dispatch, getState) => {
    const currentId = getState().notification.timeoutId
    if (currentId) clearTimeout(currentId)
    const timeoutId = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { message: '', timeoutId: 0, color },
      })
    }, 5000)
    dispatch({ type: 'SET_NOTIFICATION', data: { message, timeoutId, color } })
  }
}

export default notificationReducer
