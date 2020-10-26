import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = () => {
    axios.get(baseUrl).then((response) => {
      setResources(response.data)
      return response.data
    })
  }

  const create = (resource) => {
    axios.post(baseUrl, resource).then((response) => {
      console.log(response.data)
      setResources(resources.concat(response.data))
      return response.data
    })
  }

  const update = (resource) => {
    axios.put(baseUrl, resource).then((response) => {
      setResources(
        resources.map((resource) =>
          resource.id !== response.data.id ? resource : response.data
        )
      )
      return response.data
    })
  }

  const service = {
    getAll,
    create,
    update,
  }

  return [resources, service]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  useEffect(() => {
    const doWork = async () => {
      await noteService.getAll()
      await personService.getAll()
    }
    doWork()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  )
}

export default App
