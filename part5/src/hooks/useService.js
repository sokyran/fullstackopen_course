import { useState } from 'react'
import axios from 'axios'

const useService = (baseUrl) => {
  const [resource, setResource] = useState([])

  let token = null

  const setToken = (newToken) => {
    token = `bearer ${newToken}`
  }

  const getAll = async () => {
    const res = await axios.get(baseUrl)
    setResource(res.data)
    return res.data
  }

  const create = async (obj) => {
    const config = {
      headers: { Authorization: token },
    }

    const res = await axios.post(baseUrl, obj, config)
    setResource([...resource, res.data])
    return res.data
  }

  const update = async (obj) => {
    const config = {
      headers: { Authorization: token },
    }

    const res = await axios.put(`${baseUrl}/${obj.id}`, obj, config)
    setResource(resource.map((elem) => (elem.id !== obj.id ? elem : res.data)))
    return res.data
  }

  const removeById = async (objId) => {
    const config = {
      headers: { Authorization: token },
    }

    const res = await axios.delete(`${baseUrl}/${objId}`, config)
    setResource(resource.filter((elem) => elem.id !== objId))
    return res.data
  }

  const service = {
    setToken,
    getAll,
    create,
    update,
    removeById,
  }

  return [resource, service]
}

export default useService
