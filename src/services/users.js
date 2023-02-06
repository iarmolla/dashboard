import axios from 'axios'

const api = axios.create({
    baseURL: 'https://crud-express-production.up.railway.app'
})

export const getUsers = async () => {
    const request = await api.get('/users')
    return request.data
}

export const createUser = async (user) => {
  api.post('/users',user)
}

export const deleteUser = async (id) => {
  api.delete(`/users/${id}`)
}