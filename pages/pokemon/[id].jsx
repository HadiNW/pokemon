import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import CatchModal from '../../components/modals/Catch-Modal.jsx'

import axios from '../../lib/axios'
import CatchFailed from '../../components/modals/Catch-Failed.jsx'

const POKEMON_DETAIL = `
	query($name: String!) {
		pokemon(name: $name) {
			name
			sprites {
				front_default
			}
			moves {
				move {
					name
				}
			}
			types {
				type {
					name
				}
			}
		}
	}
`

const PokemonDetail = () => {
	const [openModal, setOpenModal] = useState(false)
	const [pokemonDetail, setPokemonDetail] = useState({})
	const [isLoading, setIsloading] = useState(false)
	const [catchFailed, setCatchFailed] = useState(false)

	const router = useRouter()

	const pokemonName = router.query.id

	const getPokemonDetail = async () => {
		setIsloading(true)
		const { data } = await axios.post('/', {
			query: POKEMON_DETAIL,
			variables: {
				name: pokemonName,
			},
		})
		setIsloading(false)

		setPokemonDetail(data.data.pokemon)
	}

	const getProbability = () => {
		return !!0.5 && Math.random() <= 0.5
	}

	const catchPokemon = () => {
		const success = getProbability()
		console.log(success, 'succ')
		if (!success) {
			setCatchFailed(true)
		} else {
			setOpenModal(true)
		}
	}

	const savePokemon = (pokemon) => {
		setOpenModal(false)
		let myPokemons = JSON.parse(localStorage.getItem('my-pokemons'))

		// Check if there is an Array in localstorage
		if (myPokemons) {
			const index = myPokemons.findIndex(
				(myPok) => myPok.originalName === pokemon.originalName,
			)
			// check if pokemon exists in my list
			if (index !== -1) {
				const newPokemon = { ...myPokemons[index] }
				newPokemon.qty = newPokemon.qty + 1
				newPokemon.names = [...newPokemon.names, pokemon.customName]

				// update the list of my pokemons
				myPokemons[index] = newPokemon

				// ownedPokemon.qty = ownedPokemon.qty + 1
				// ownedPokemon.names = [...ownedPokemon.names, pokemon.customName]
				// myPokemons = [...myPokemons, ownedPokemon]
			} else {
				const newPokemon = {
					originalName: pokemon.originalName,
					qty: 1,
					names: [pokemon.customName],
				}
				// pokemon.qty = 1
				// myPokemons = [...myPokemons, pokemon]
				// ownedPokemon.qty = 1
				myPokemons = [...myPokemons, newPokemon]
			}
		} else {
			const newPokemon = {
				originalName: pokemon.originalName,
				qty: 1,
				names: [pokemon.customName],
			}

			myPokemons = [newPokemon]
		}
		localStorage.setItem('my-pokemons', JSON.stringify(myPokemons))
	}

	useEffect(() => {
		if (router.isReady) {
			getPokemonDetail()
		}
	}, [pokemonName])

	if (isLoading) {
		return <p>Loading ....</p>
	}

	return (
		<div className='pokemon-detail'>
			<div className='pokemon-detail-card'>
				<img
					className='pokemon-image'
					src={pokemonDetail.sprites?.front_default}
					alt=''
				/>
				<h2 className='pokemon-name'>{pokemonDetail.name}</h2>
				<div className='line'></div>
				<div className='container'>
					<div className='content'>
						<p>Moves : </p>
						<ul className='moves'>
							{pokemonDetail.moves?.splice(0, 4).map(({ move }) => (
								<li key={move.name}>{move.name}</li>
							))}
						</ul>
					</div>
					<div className='content'>
						<p>Types :</p>
						<ul className='moves'>
							{pokemonDetail.types?.splice(0, 4).map(({ type }) => (
								<li key={type.name}>{type.name}</li>
							))}
						</ul>
					</div>
				</div>
				<button onClick={catchPokemon} className='button'>
					Catch Pokemon
				</button>
			</div>

			{openModal && (
				<CatchModal
					setOpenModal={setOpenModal}
					savePokemon={savePokemon}
					pokemon={pokemonDetail}
				/>
			)}
			{catchFailed && (
				<CatchFailed
					setCatchFailed={setCatchFailed}
					pokemon={pokemonDetail}
				/>
			)}
		</div>
	)
}

export default PokemonDetail
