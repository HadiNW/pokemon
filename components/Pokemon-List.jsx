import React, { useEffect, useState, useRef, useCallback } from 'react'
import PokemonCard from './Pokemon-Card'
import { useRouter } from 'next/router'
import Observable from 'zen-observable'

const PokemonList = ({ pokemons, fetchMore, fetchMoreLoading, nextUrl }) => {
	return (
		<div className='pokemon-list'>
			<div className='inner-list'>
				{pokemons?.map((pokemon, i) => (
					<PokemonCard key={pokemon.id} pokemon={pokemon} />
				))}
				{fetchMoreLoading ? (
					<p>Loading ....</p>
				) : (
					<p onClick={() => fetchMore(nextUrl)}>loadmore</p>
				)}
			</div>
		</div>
	)
}

export default PokemonList
