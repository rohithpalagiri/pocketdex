import axios from 'axios'
const baseUrl = 'http://localhost:3001/'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getPkm = (id) => {
    const request = axios.get(`${baseUrl}pokedex/${id}`)
    return request.then(response => response.data)
}

export default { getAll, getPkm }