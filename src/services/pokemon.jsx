import axios from 'axios'
const baseUrl = '/'

const getAll = () => {
    const request = axios.get(`${baseUrl}api/pokedex`)
    return request.then(response => response.data)
}

const getPkm = (id) => {
    const request = axios.get(`${baseUrl}api/pokedex/${id}`)
    return request.then(response => response.data)
}

export default { getAll, getPkm }