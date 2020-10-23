import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAdd = async (event) => {
    event.preventDefault()
    dispatch(addAnec(event.target.content.value))
    dispatch(setNotification(`you added '${event.target.content.value}!'`))
  }

  return (
    <form onSubmit={handleAdd}>
      <div>
        <input name="content" />
      </div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm
