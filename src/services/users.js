import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dashboard-api-production-2056.up.railway.app/'
})

export const getUsers = async () => {
  const request = await api.get('/users')
  return request.data
}

export const getUser = async (query) => {
  return await api.get(`/users/${query}`)
}

export const createUser = async (user) => {
  const token = localStorage.getItem('token')

  return await api.post('/users', user, { headers: { 'x-access-token': token } })
}

export const deleteUser = async (id) => {
  const token = localStorage.getItem('token')

  return await api.delete(`/users/${id}`, { headers: { 'x-access-token': token } })
}

export const editUser = async (user) => {
  const token = localStorage.getItem('token')
  return await api.put(`/users`, user, { headers: { 'x-access-token': token } })
}

export const settings = async (user) => {
  const token = localStorage.getItem('token')
  return await api.patch(`/users`, user, { headers: { 'x-access-token': token } })
}

export const loginUser = async (user) => {
  const token = localStorage.getItem('token')

  return await api.post(`/login`, user, { headers: { 'x-access-token': token } })
}

export const searchUser = async (query) => {
  return await api.get(`/users/${query}`)
}

export const registerUser = async (user) => {
  return await api.post(`/register`, user)
}