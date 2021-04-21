import React from 'react'

const PokemonCard = () => {
	return (
		<div className='pokemon-card'>
			<img className='pokemon-image' src='/assets/dino.png' alt='' />
			<p>Dinosaur</p>
			<div className='owned'>5 pokemons owned</div>
		</div>
	)
}

export default PokemonCard
