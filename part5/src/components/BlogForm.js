import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { setVisibilityHide } from '../reducers/visibilityReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      dispatch(addBlog({ title, author, url }))
      dispatch(
        setNotification(`A new blog ${title} by ${author} was created`, 'green')
      )
      setTitle('')
      setAuthor('')
      setUrl('')
      dispatch(setVisibilityHide())
    } catch (err) {
      dispatch(setNotification(err.message, 'red'))
      console.log(err.message)
    }
  }

  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={handleCreate}>
        <p>
          title:{' '}
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </p>
        <p>
          author:{' '}
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </p>
        <p>
          url:{' '}
          <input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
        </p>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
