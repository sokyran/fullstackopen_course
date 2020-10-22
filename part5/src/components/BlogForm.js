import React, { useState } from 'react'

const BlogForm = ({ makeMessage, setColor, addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      await addBlog({ title, author, url })
      setColor('green')
      makeMessage(`A new blog ${title} by ${author} was created`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (err) {
      setColor('red')
      makeMessage(err.message)
      console.log(err.message)
    }
  }

  return (
    <div>
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
