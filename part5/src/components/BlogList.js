import React, { useEffect } from 'react'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { initBlogs } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  return (
    <div>
      <h3>Current blogs</h3>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
