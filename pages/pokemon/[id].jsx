import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import CatchModal from '../../components/Modals/Catch-Modal'

import axios from '../../lib/axios'

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

	const catchPokemon = (pokemonName) => {
		console.log(pokemonName)
		setOpenModal(false)
		router.push('/my-pokemon')
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
				<img className='pokemon-image' src={pokemonDetail.sprites?.front_default} alt='' />
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
				<button onClick={() => setOpenModal(true)} className='button'>
					Catch Pokemon
				</button>
			</div>
			{openModal && (
				<CatchModal
					setOpenModal={setOpenModal}
					catchPokemon={catchPokemon}
					pokemon={pokemonDetail}
				/>
			)}
		</div>
	)
}

export default PokemonDetail
