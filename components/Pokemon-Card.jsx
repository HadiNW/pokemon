import { useRouter } from 'next/router'

import Link from 'next/link'

const PokemonCard = ({ pokemon }) => {
	const router = useRouter()

	return (
		<div className='pokemon-card' onClick={() => router.push('/pokemon/1')}>
			<Link href={`/pokemon/${1}`}>
				<>
					<img className='pokemon-image' src={pokemon.image} alt='poke image' />
					<p>{pokemon.name}</p>
					<div className='owned'>5 pokemons owned</div>
				</>
			</Link>
		</div>
	)
}

export default PokemonCard
