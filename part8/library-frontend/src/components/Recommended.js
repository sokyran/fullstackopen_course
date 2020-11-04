import React from 'react'
import { useQuery } from '@apollo/client'
import { ME } from '../queries'

const Recommended = ({ show, booksResult }) => {
  const result = useQuery(ME)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  const books = booksResult.data.allBooks
  const favoriteGenre = result.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre: <b>{favoriteGenre}</b>
        <div>
          <div>
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>author</th>
                  <th>published</th>
                </tr>
                {books
                  .filter((book) => book.genres.includes(favoriteGenre))
                  .map((a) => (
                    <tr key={a.title}>
                      <td>{a.title}</td>
                      <td>{a.author.name}</td>
                      <td>{a.published}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommended
