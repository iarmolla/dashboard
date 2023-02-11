import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3030'
})
const token = localStorage.getItem('token')

export const getUsers = async () => {
  const request = await api.get('/users')
  return request.data
}

export const createUser = async (user) => {
  return await api.post('/users', user, { headers: { 'x-access-token': token } })
}

export const deleteUser = async (id) => {
  return await api.delete(`/users/${id}`, { headers: { 'x-access-token': token } })
}

export const editUser = async (user) => {
  return await api.put(`/users`, user, { headers: { 'x-access-token': token } })
}

export const loginUser = async (user) => {
  return await api.post(`/login`, user, { headers: { 'x-access-token': token } })
}

export const registerUser = async (user) => {
  return await api.post(`/register`, user)
}