import axios from 'axios'
const baseUrl = '/api/login'

const login = async (userData) => {
  const req = await axios.post(baseUrl, userData)
  return req.data
}

export default { login }
