import axios from 'axios'

export const orderProvider = axios.create({
  baseURL: 'https://burger-builder-88b5a-default-rtdb.firebaseio.com/',
})
