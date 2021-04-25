import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import CatchModal from '../../components/modals/Catch-Modal.jsx'

import axios from '../../lib/axios'
import CatchFailed from '../../components/modals/Catch-Failed.jsx'
import Spinner from '../../components/Spinner.jsx'

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
	const [error, setError] = useState()

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

		if (!success) {
			setCatchFailed(true)
		} else {
			setOpenModal(true)
		}
		
	}

	const savePokemon = (pokemon) => {
		let myPokemons = JSON.parse(localStorage.getItem('my-pokemons'))

		if (!pokemon.customName) {
			setError('Please fill the nick name')
			return
		}

		// Check if there is an Array in localstorage
		if (myPokemons) {
			const index = myPokemons.findIndex(
				(myPok) => myPok.originalName === pokemon.originalName,
			)

			// check if pokemon exists in my list
			if (index !== -1) {
				const newPokemon = { ...myPokemons[index] }

				// check if nick name already used
				const used = newPokemon.names.find(
					(name) => name === pokemon.customName,
				)
				if (used) {
					setError('Nick name already used!')
					return
				} else {
					newPokemon.names = [...newPokemon.names, pokemon.customName]
				}

				// update the list of my pokemons
				myPokemons[index] = newPokemon
			} else {
				const newPokemon = {
					originalName: pokemon.originalName,
					image: pokemon.image,
					names: [pokemon.customName],
				}

				myPokemons = [...myPokemons, newPokemon]
			}
		} else {
			const newPokemon = {
				originalName: pokemon.originalName,
				image: pokemon.image,
				names: [pokemon.customName],
			}

			myPokemons = [newPokemon]
		}

		localStorage.setItem('my-pokemons', JSON.stringify(myPokemons))
		setOpenModal(false)
	}

	useEffect(() => {
		console.log('effect')
		if (router.isReady) {
			getPokemonDetail()
		}
	}, [pokemonName])

	if (isLoading) {
		return <Spinner />
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
							{pokemonDetail.moves?.slice(0, 4).map(({ move }) => (
								<li key={move.name}>{move.name}</li>
							))}
						</ul>
					</div>
					<div className='content'>
						<p>Types :</p>
						<ul className='moves'>
							{pokemonDetail.types?.slice(0, 4).map(({ type }) => (
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
					error={error}
				/>
			)}
			{catchFailed && (
				<CatchFailed setCatchFailed={setCatchFailed} pokemon={pokemonDetail} />
			)}
		</div>
	)
}

export default PokemonDetail
