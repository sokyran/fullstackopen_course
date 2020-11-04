import React, { useState } from 'react'
import Select from 'react-select'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [author, setAuthor] = useState(null)
  const [bornDate, setBornDate] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const options = authors.map((a) => {
    return { value: a.name, label: a.name }
  })

  const handleSetBirth = (e) => {
    e.preventDefault()
    editAuthor({ variables: { author, setBornTo: Number(bornDate) } })
    setAuthor(null)
    setBornDate('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={handleSetBirth}>
        <p>Select the author:</p>
        <div style={{ paddingBottom: 10 }}>
          <Select
            value={{ value: author, label: author }}
            onChange={(e) => {
              setAuthor(e.value)
            }}
            options={options}
          ></Select>
        </div>

        <div>
          year
          <input
            type="number"
            value={bornDate}
            onChange={(e) => setBornDate(e.target.value)}
          ></input>
        </div>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  )
}

export default Authors
