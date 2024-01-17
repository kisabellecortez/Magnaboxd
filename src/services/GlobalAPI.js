import axios from 'axios'

const key = "dc3c91b5913d43cebc91ab189f536f8e"; 
const axiosCreate = axios.create({
    baseURL: 'https://api.rawg.io/api'
})

const getGamesList = axiosCreate.get('/games?key=' + key); 

const exportedObject = {
    getGamesList
}

export default exportedObject