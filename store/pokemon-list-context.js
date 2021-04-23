import { useState, useEffect, createContext } from 'react';

import axios from '../lib/axios'

const POKEMON_LIST = `
	query($limit: Int, $offset: Int) {
		pokemons(limit: $limit, offset: $offset) {
			results {
				id
				name
				image
			}
			next
		}
	}
`

const PokemonListContext = createContext({
	pokemonList: [],
	isLoading: false,
	nextUrl: '',
	fetchMoreLoading: false,
	getPokemonList: () => {},
	fetchMore: () => {}
})

export const PokemonListProvider = props => {
	const [pokemonList, setPokemonList] = useState()
	const [nextUrl, setNextUrl] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [fetchMoreLoading, setFetchMoreLoading] = useState(false)

	const getPokemonList = async () => {
		console.log('get poke')
		setIsLoading(true)
		const { data } = await axios.post('/', {
			query: POKEMON_LIST,
		})

		setPokemonList(data.data.pokemons.results)
		setNextUrl(data.data.pokemons.next)

		setIsLoading(false)
	}

	const fetchMore = async (next) => {
		const url = new URL(next)
		const queryParams = new URLSearchParams(url.search)

		setFetchMoreLoading(true)
		const variables = {
			limit: Number(queryParams.get('limit')),
			offset: Number(queryParams.get('offset')),
		}

		const { data } = await axios.post('/', {
			query: POKEMON_LIST,
			variables,
		})

		setPokemonList((prev) => [...prev, ...data.data.pokemons.results])
		setNextUrl((prev) => data.data.pokemons.next)

		setFetchMoreLoading(false)
	}

	return <PokemonListContext.Provider value={{
		pokemonList,
		isLoading,
		nextUrl,
		fetchMoreLoading,
		getPokemonList,
		fetchMore,
	}}>
		{props.children}
	</PokemonListContext.Provider>
}

export default PokemonListContext
