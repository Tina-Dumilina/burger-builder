import axios from 'axios'

export const authProvider = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
})
