import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (userData) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, userData, config)
  return res.data
}

const update = async (userData) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.put(`${baseUrl}/${userData.id}`, userData, config)
  return res.data
}

const removeById = async (userId) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.delete(`${baseUrl}/${userId}`, config)
  return res.data
}

export default { getAll, setToken, create, update, removeById }
