import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.data]
    case 'UPDATE':
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      )
    case 'REMOVE':
      return state.filter((blog) => blog.id !== action.data.id)
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const addBlog = (data) => {
  return async (dispatch) => {
    const res = await blogService.create(data)
    dispatch({
      type: 'ADD',
      data: res,
    })
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    data.sort((a, b) => (a.likes < b.likes ? 1 : -1))
    dispatch({
      type: 'INIT',
      data,
    })
  }
}

export const updateBlog = (data) => {
  return async (dispatch) => {
    dispatch({
      type: 'UPDATE',
      data,
    })
    await blogService.update(data)
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)

    dispatch({
      type: 'REMOVE',
      data: { id },
    })
  }
}

export default blogsReducer
