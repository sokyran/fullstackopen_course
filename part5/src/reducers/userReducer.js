import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'CLEAR_USER':
      return {}
    default:
      return state
  }
}

export const setUser = (data) => {
  return async (dispatch) => {
    blogService.setToken(data.token)
    dispatch({ type: 'SET_USER', data })
  }
}

export const clearUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch({ type: 'CLEAR_USER' })
  }
}

export const logInAsUser = ({ username, password }) => {
  return async (dispatch) => {
    const result = await loginService.login({ username, password })
    console.log(result)
    window.localStorage.setItem('loggedUser', JSON.stringify(result))
    dispatch({ type: 'SET_USER', data: result })
  }
}
export default userReducer
