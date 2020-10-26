import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, userId }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const [btnText, setBtnText] = useState('view')

  const showWhenVisible = { display: visible ? '' : 'none' }

  const updateLikes = async () => {
    try {
      const newBlog = { ...blog, likes: blog.likes + 1 }
      dispatch(updateBlog(newBlog))
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleRemove = async () => {
    const result = window.confirm(
      `Do you want to remove ${blog.title} by ${blog.author}?`
    )
    if (result) {
      try {
        dispatch(removeBlog(blog.id))
      } catch (err) {
        console.log(err)
      }
    }
  }

  const blogStyle = {
    border: '2px solid',
    padding: '6px',
    marginBottom: '10px',
  }

  return (
    <div className="testBlog" style={blogStyle}>
      <em className="testTitle">{blog.title}</em> by{' '}
      <b className="testAuthor">{blog.author}</b>{' '}
      <button
        className="clickToShow"
        onClick={() => {
          setVisible(!visible)
          let newText = btnText !== 'hide' ? 'hide' : 'view'
          setBtnText(newText)
        }}
      >
        {btnText}
      </button>
      <div className="testHidden" style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{' '}
          <button className="clickToLike" onClick={updateLikes}>
            like
          </button>{' '}
        </div>
        <div>{blog.user.name}</div>
        <div>
          {userId === blog.user.id && (
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog
