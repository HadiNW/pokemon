import React, { useEffect, useState, useRef, useCallback } from 'react'
import PokemonCard from './Pokemon-Card'
import { useRouter } from 'next/router'

const PokemonList = ({ pokemons, fetchMore, next }) => {
	const pokemonList = useRef()
	const [a, setA] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

	const router = useRouter()

	// console.log({ fetchMore })

	const handlePage = (e) => {
		// console.log('nex', next)
		if (!next) {
			return
		}
		const url = new URL(next)
		// console.log({next})
		const querParams = new URLSearchParams(url.search)
		if (e[0].isIntersecting && a.length <= 50) {
			// setA(prev => [...prev,1,2,3,4])
			// console.log(a.length)
			fetchMore({
				variables: {
					limit: Number(querParams.get('limit')),
					offset: Number(querParams.get('offset')),
				},
				// notifyOnNetworkStatusChange: true 
			})
		}
	}
	useEffect(() => {
		console.log({kk: next})
		const opt = {
			root: null,
			rootMargin: '0px',
			threshold: 1.0,
		}
		const observer = new IntersectionObserver(handlePage, opt)
		if (pokemonList.current) {
			observer.observe(pokemonList.current)
		}
	}, [next])
	return (
		<div className='pokemon-list'>
			<p>ini {next}</p>
			<div className='inner-list'>
				{pokemons.map((pokemon, i) => (
					<PokemonCard key={i} pokemon={pokemon} />
				))}
				<p ref={pokemonList}>loadmore</p>
			</div>
		</div>
	)
}

export default PokemonList
