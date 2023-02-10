import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3030'
})

export const getUsers = async () => {
  const request = await api.get('/users')
  return request.data
}

export const createUser = async (user) => {
  api.post('/users', user)
}

export const deleteUser = async (id) => {
  api.delete(`/users/${id}`)
}

export const editUser = async (user) => {
  api.put(`/users`, user)
}

export const loginUser = async (user) => {
  const token = localStorage.getItem('token')
  const headers = {
    "x-access-token": token
  };
  return await api.post(`/login`, user, {
    headers: headers
  })
}

export const registerUser = async (user) => {
  return await api.post(`/register`, user)
}