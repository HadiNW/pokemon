import React, { useEffect, useState, useRef, useCallback } from 'react'
import PokemonCard from './Pokemon-Card'

const PokemonList = ({
	pokemons,
	fetchMore,
	fetchMoreLoading,
	nextUrl,
	title,
	type,
	releasePokemon,
}) => {
	return (
		<div className='pokemon-list'>
			<h2 className='title'>{title}</h2>
			<div className='inner-list'>
				{pokemons?.map((pokemon, i) => (
					<PokemonCard key={pokemon.name + i} pokemon={pokemon} type={type} releasePokemon={releasePokemon} />
				))}
			</div>
			<div className='loadmore'>
				{type === 'owned' && (
					<>
						{fetchMoreLoading ? (
							<p>Loading ....</p>
						) : (
							<p onClick={() => fetchMore(nextUrl)}>loadmore</p>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default PokemonList
