// main reducer
const notificationReducer = (state = { message: '', timeoutId: 0 }, action) => {
  switch (action.type) {
    case 'SET':
      return {
        message: action.notification.message,
        timeoutId: action.notification.timeoutId,
      }
    default:
      return state
  }
}

// action for setting reducer
export const setNotification = (message, time = 5) => {
  return async (dispatch, getState) => {
    const currentId = getState().notification.timeoutId
    if (currentId) clearTimeout(currentId)
    const timeoutId = setTimeout(
      () => dispatch({ type: 'SET', notification: { message: '' } }),
      time * 1000
    )
    dispatch({ type: 'SET', notification: { message, timeoutId } })
  }
}

export default notificationReducer
