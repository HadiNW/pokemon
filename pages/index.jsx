import { useEffect, useContext } from 'react'

import Head from 'next/head'

import PokemonListContext from '../store/pokemon-list-context'

import PokemonList from '../components/Pokemon-List'
import Spinner from '../components/Spinner'

const Home = () => {
	const ctx = useContext(PokemonListContext)

	useEffect(() => {
		console.log('effect', ctx)
		ctx.getPokemonList()
	}, [])

	if (ctx.isLoading) {
		return <Spinner />
	}
	return (
		<>
			<Head>
				<title>Pokemon | List</title>
			</Head>
				<div className='home-page'>
					<PokemonList
						type='owned'
						title='POKEMON LIST'
						pokemons={ctx.pokemonList}
						fetchMore={ctx.fetchMore}
						fetchMoreLoading={ctx.fetchMoreLoading}
						nextUrl={ctx.nextUrl}
						isLoading={ctx.isLoading}
					/>
				</div>
		</>
	)
}

export default Home
