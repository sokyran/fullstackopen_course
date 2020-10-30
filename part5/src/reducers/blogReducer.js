import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG':
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      )
    case 'ADD_COMMENT': {
      const blog = state.find((blog) => blog.id === action.data.id)

      const updatedBlog = {
        ...blog,
        comments: blog.comments.concat(action.data.comment),
      }

      return state.map((blog) =>
        blog.id !== action.data.id ? blog : updatedBlog
      )
    }
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
      type: 'ADD_BLOG',
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
      type: 'UPDATE_BLOG',
      data,
    })
    await blogService.update(data)
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.removeById(id)

    dispatch({
      type: 'REMOVE',
      data: { id },
    })
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    await blogService.addComment(id, comment)

    dispatch({ type: 'ADD_COMMENT', data: { id, comment } })
  }
}

export default blogsReducer
