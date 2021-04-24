import { useRouter } from 'next/router'

import Link from 'next/link'

const PokemonCard = ({ pokemon, type, releasePokemon }) => {
	const router = useRouter()

	const LinkWrap = (props) => (
		<Link href={`/pokemon/${pokemon.name}`}>{props.children}</Link>
	)

	if (type === 'release') {
		return (
			<>
			<div className='pokemon-card'>
				<img className='pokemon-image' src={pokemon.image} alt='poke image' />
				<p>{pokemon.originalName}</p>
				<p>{pokemon.name}</p>
				<button className='release' onClick={() => releasePokemon(pokemon)}>Release Pokemon</button>
			</div>
			</>
		)
	}

	return (
		<LinkWrap>
			<div className='pokemon-card'>
				<img className='pokemon-image' src={pokemon.image} alt='poke image' />
				<p>{pokemon.name}</p>
				<div className='owned'>{pokemon.owned || 0} pokemons owned</div>
			</div>
		</LinkWrap>
	)
}

export default PokemonCard
