import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserDetails = () => {
  const users = useSelector((state) => state.users)
  const id = useParams().id

  const user = users.find((u) => u.id === id)
  console.log(user)

  return (
    <div>
      <h2>User</h2>
      <h3>added blogs</h3>
      <ul>
        {user && user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default UserDetails
