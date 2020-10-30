import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const initUsers = () => {
  return async (dispatch) => {
    const res = await usersService.getAll()
    dispatch({ type: 'INIT_USERS', data: res })
  }
}

export default usersReducer
