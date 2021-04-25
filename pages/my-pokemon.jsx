import { useEffect, useState } from 'react'
import ReleaseModal from '../components/modals/Release-Modal'

import PokemonList from '../components/Pokemon-List'

const MyPokemon = () => {
	const [myPokemons, setMyPokemons] = useState()
	const [openConfirmation, setOpenConfirmation] = useState(false)
	const [pokemon, setPokemon] = useState(false)

	const handleRelease = (pokemon) => {
		setPokemon(pokemon)
		setOpenConfirmation(true)
	}

	const releasePokemon = (pokemon) => {
		const newPokemons = myPokemons.filter(
			(myPokemon) =>
				myPokemon.name !== pokemon.name ||
				myPokemon.originalName !== pokemon.originalName,
		)
		setMyPokemons(newPokemons)

		// write to local storage
		const obj = {}
		for (let i = 0; i < newPokemons.length; i++) {
			console.log('FIRST', obj)
			const data = newPokemons[i]
			obj[data.originalName] = {
				originalName: data.originalName,
				image: data.image,
				names: obj[data.originalName]
					? [...obj[data.originalName].names, data.name]
					: [data.name],
			}
		}

		const result = []
		for (let i in obj) {
			result.push({
				originalName: obj[i].originalName,
				image: obj[i].image,
				names: obj[i].names,
			})
		}

		// write to local storage
		localStorage.setItem('my-pokemons', JSON.stringify(result))

		setOpenConfirmation(false)
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
					})
				})
			})

			console.log(results, 'res')

			setMyPokemons(results)
		}
	}, [])

	return (
		<>
			<div className='home-page'>
				<PokemonList
					type='release'
					title='MY POKEMON'
					pokemons={myPokemons}
					handleRelease={handleRelease}
				/>
			</div>
			{openConfirmation && (
				<ReleaseModal
					pokemon={pokemon}
					close={() => setOpenConfirmation(false)}
					continueRelease={() => releasePokemon(pokemon)}
				/>
			)}
		</>
	)
}

export default MyPokemon
