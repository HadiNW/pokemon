import axios from 'axios'

export default axios.create({
	baseURL: 'https://graphql-pokeapi.vercel.app/api/graphql',
})