import { useRouter } from 'next/router'

import Link from 'next/link'

const PokemonCard = ({ pokemon }) => {
	const router = useRouter()

	return (
		<Link href={`/pokemon/${pokemon.name}`}>
			<div className='pokemon-card'>
				<img className='pokemon-image' src={pokemon.image} alt='poke image' />
				<p>{pokemon.name}</p>
				<div className='owned'>5 pokemons owned</div>
			</div>
		</Link>
	)
}

export default PokemonCard
