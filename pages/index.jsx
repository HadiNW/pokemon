import { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

import PokemonList from '../components/Pokemon-List'

const POKEMON_LIST = gql`
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
	const { loading, error, data, fetchMore } = useQuery(POKEMON_LIST)

	const [next, setNext] = useState('')
	const [loadings, setLoading] = useState()

	useEffect(() => {
		if (data) {
			// console.log({ loading }, { data })
			setNext(data.pokemons.next)
			// setLoading(loading)
		}
	}, [data])

	if (loading) {
		return <p>Loading ..</p>
	}

	return (
		<div className='home-page'>
			<p>{next} st</p>
			<p>{data.pokemons.next} net</p>
			<PokemonList
				pokemons={data.pokemons.results}
				fetchMore={fetchMore}
				next={next}
				loading={loadings}
			/>
		</div>
	)
}

export default Home
