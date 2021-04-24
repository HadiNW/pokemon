import { useEffect, useContext } from 'react'

import PokemonListContext from '../store/pokemon-list-context'

import PokemonList from '../components/Pokemon-List'

const Home = () => {

	const ctx = useContext(PokemonListContext)

	useEffect(() => {
		console.log('effect', ctx)
		ctx.getPokemonList()
	}, [])

	return (
			<div className='home-page'>
				<PokemonList
					type='owned'
					title='POKEMON LIST'
					pokemons={ctx.pokemonList}
					fetchMore={ctx.fetchMore}
					fetchMoreLoading={ctx.fetchMoreLoading}
					nextUrl={ctx.nextUrl}
				/>
			</div>
	)
}

export default Home
