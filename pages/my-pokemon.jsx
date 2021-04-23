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

const MyPokemon = () => {
	
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

export default MyPokemon
