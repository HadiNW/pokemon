import { useEffect, useState, useCallback, useContext } from 'react'

import PokemonListContext, { PokemonListProvider } from '../store/pokemon-list-context'

import PokemonList from '../components/Pokemon-List'

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

const Home = () => {
	// const [pokemonList, setPokemonList] = useState()
	// const [nextUrl, setNextUrl] = useState()
	// const [loading, setLoading] = useState(false)
	// const [fetchMoreLoading, setfetchMoreLoading] = useState(false)

	// const getPokemonList = async () => {
	// 	setLoading(true)
	// 	const { data } = await axios.post('/', {
	// 		query: POKEMON_LIST,
	// 	})

	// 	setPokemonList(data.data.pokemons.results)
	// 	setNextUrl(data.data.pokemons.next)

	// 	setLoading(false)
	// }

	// const fetchMore = async (ddd) => {
	// 		const url = new URL(ddd)
	// 		const queryParams = new URLSearchParams(url.search)

	// 		setfetchMoreLoading(true)
	// 		const variables = {
	// 			limit: Number(queryParams.get('limit')),
	// 			offset: Number(queryParams.get('offset')),
	// 		}

	// 		const { data } = await axios.post('/', {
	// 			query: POKEMON_LIST,
	// 			variables,
	// 		})

	// 		setPokemonList((prev) => [...prev, ...data.data.pokemons.results])
	// 		setNextUrl((prev) => data.data.pokemons.next)

	// 		setfetchMoreLoading(false)
	// }

	const ctx = useContext(PokemonListContext)

	useEffect(() => {
		console.log('effect', ctx)
		ctx.getPokemonList()
	}, [])

	return (
			<div className='home-page'>
				<PokemonList
					pokemons={ctx.pokemonList}
					fetchMore={ctx.fetchMore}
					fetchMoreLoading={ctx.fetchMoreLoading}
					nextUrl={ctx.nextUrl}
				/>
			</div>
	)
}

export default Home
