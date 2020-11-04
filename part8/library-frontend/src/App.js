import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import { useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED, ALL_AUTHORS, AUTHOR_ADDED } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('')
  const booksResult = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  useEffect(() => {
    setToken(window.localStorage.getItem('token'))
  }, [])

  const updateBookCacheWith = (addedBook) => {
    const includesIn = (arr, object) => arr.map((b) => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includesIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  const updateAuthorCacheWith = (addedAuthor) => {
    const includesIn = (arr, object) => arr.map((b) => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_AUTHORS })
    if (!includesIn(dataInStore.allAuthors, addedAuthor)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: dataInStore.allAuthors.concat(addedAuthor) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      window.alert(`'${subscriptionData.data.bookAdded.title}' was added!`)
      updateBookCacheWith(subscriptionData.data.bookAdded)
    },
  })

  useSubscription(AUTHOR_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      updateAuthorCacheWith(subscriptionData.data.authorAdded)
    },
  })

  const logout = () => {
    setToken(null)
    window.localStorage.clear()
    client.clearStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <div style={{ display: 'inline' }}>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => logout()}>logout</button>
          </div>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} booksResult={booksResult} />
      <NewBook
        show={page === 'add'}
        setPage={setPage}
        updateCacheWith={updateBookCacheWith}
      />
      <Recommended show={page === 'recommended'} booksResult={booksResult} />
      <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
