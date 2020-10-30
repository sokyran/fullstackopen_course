import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (blogData) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, blogData, config)
  return res.data
}

const update = async (blogData) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.put(`${baseUrl}/${blogData.id}`, blogData, config)
  return res.data
}

const removeById = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.delete(`${baseUrl}/${blogId}`, config)
  return res.data
}

const addComment = async (blogId, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    { comment },
    config
  )
  return res.data
}

export default { getAll, setToken, create, update, removeById, addComment }
