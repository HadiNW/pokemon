import { useEffect, useState, useCallback, useContext } from 'react'

import PokemonListContext, {
	PokemonListProvider,
} from '../store/pokemon-list-context'

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
	const [myPokemons, setMyPokemons] = useState()

	const releasePokemon = (name) => {
		const myPokemons = JSON.parse(localStorage.getItem('my-pokemons'))
		console.log({myPokemons})
	}

	useEffect(() => {
		const myPokemons = JSON.parse(localStorage.getItem('my-pokemons'))
		if (myPokemons) {
			const results = []

			myPokemons.forEach((pokemon) => {
				pokemon.names.forEach((name) => {
					results.push({
						name: name,
						image: pokemon.image,
						originalName: pokemon.originalName,
						qty: pokemon.qty,
					})
				})
			})

			setMyPokemons(results)
		}
	}, [])

	return (
		<div className='home-page'>
			<PokemonList type='release' title='MY POKEMON' pokemons={myPokemons} releasePokemon={releasePokemon} />
		</div>
	)
}

export default MyPokemon
