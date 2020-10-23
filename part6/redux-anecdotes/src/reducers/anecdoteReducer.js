import anecdotesService from '../services/anecdotes'

const anecdotesReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const changedAnec = action.data
      return state.map((a) => (a.id !== action.data.id ? a : changedAnec))
    case 'ADD':
      const newAnec = {
        content: action.data.content,
        id: action.data.id,
        votes: action.data.votes,
      }
      return [...state, newAnec]
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({ type: 'INIT', data: anecdotes })
  }
}

export const vote = (id) => {
  return async (dispatch) => {
    const votedAnec = await anecdotesService.getOne(id)
    const data = await anecdotesService.update({
      ...votedAnec,
      votes: votedAnec.votes + 1,
    })
    dispatch({
      type: 'VOTE',
      data,
    })
  }
}

export const addAnec = (content) => {
  return async (dispatch) => {
    const addedAnec = await anecdotesService.create(content)
    dispatch({
      type: 'ADD',
      data: addedAnec,
    })
  }
}

export default anecdotesReducer
