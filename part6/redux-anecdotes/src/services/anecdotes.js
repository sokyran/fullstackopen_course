import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getOne = async (id) => {
  const res = await axios.get(baseUrl + '/' + id)
  return res.data
}

const create = async (content) => {
  const newAnec = {
    content,
    votes: 0,
  }
  const res = await axios.post(baseUrl, newAnec)
  return res.data
}

const update = async (content) => {
  const res = await axios.put(`${baseUrl}/${content.id}`, content)
  return res.data
}

export default { getAll, create, update, getOne }
