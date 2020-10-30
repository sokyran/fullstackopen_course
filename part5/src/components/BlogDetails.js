import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  initBlogs,
  updateBlog,
  removeBlog,
  addComment,
} from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const BlogDetails = () => {
  const [comment, setComment] = useState('')
  const history = useHistory()
  const id = useParams().id
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const handleLike = async () => {
    try {
      dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
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
        history.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }

  const blogs = useSelector((state) => state.blogs)

  const user = useSelector((state) => state.user)
  const blog = blogs.find((blog) => blog.id === id)
  if (!blog) return null

  const commentStyle = { width: 300, height: 100 }

  const handleComment = (e) => {
    e.preventDefault()
    dispatch(addComment(blog.id, comment))
    setComment('')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      {blog.likes} likes <button onClick={handleLike}> like </button>
      <div>added by {blog.user.name}</div>
      {user.id === blog.user.id && (
        <button onClick={handleRemove}> remove blog </button>
      )}
      <div>
        <h3>Comments</h3>
        <ul>
          {blog.comments &&
            blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
        </ul>
      </div>
      <div style={{ paddingTop: 10 }}>
        <form onSubmit={handleComment}>
          <textarea
            style={commentStyle}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div>
            <button type="submit">submit comment</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BlogDetails
