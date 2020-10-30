import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    border: '2px solid',
    padding: '6px',
    marginBottom: '10px',
  }

  return (
    <div className="testBlog" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
    </div>
  )
}

export default Blog
