import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  const anecdotesToShow = anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1))

  const handleVote = (event) => {
    const id = event.target.value
    props.vote(id)
    const anecdoteText = anecdotes.find((a) => a.id === id).content
    props.setNotification(`you voted for '${anecdoteText}'!`)
  }

  return (
    <div>
      {anecdotesToShow.map((anecdote) => (
        <div key={anecdote.key}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button value={anecdote.id} onClick={handleVote}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  const anecdotes = state.filter
    ? state.anecdotes.filter((anecdote) =>
        anecdote.content.startsWith(state.filter)
      )
    : state.anecdotes
  return {
    anecdotes,
  }
}

const mapDispatchToProps = {
  setNotification,
  vote,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
