import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show, booksResult }) => {
  const [getFilteredBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    getFilteredBooks({ variables: { genre: filter } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  const initialBooks = booksResult.data.allBooks
  const genres = initialBooks.reduce((res, curr) => {
    return res.concat(curr.genres)
  }, [])

  const genresUniq = [...new Set(genres)]

  return (
    <div>
      <h2>books</h2>
      <div>Showing books for filter: {filter}</div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genresUniq.map((g) => (
          <button value={g} key={g} onClick={(e) => setFilter(e.target.value)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
