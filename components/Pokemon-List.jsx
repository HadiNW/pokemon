import React, { useEffect, useState, useRef, useCallback } from 'react'
import PokemonCard from './Pokemon-Card'

const PokemonList = () => {
	const pokemonList = useRef()
	const [a, setA] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

	const handlePage = e => {
		console.log(e)
		if (e[0].isIntersecting &&  a.length <= 50) {
			setA(prev => [...prev,1,2,3,4])
			console.log(a.length)
		}
	}
	useEffect(() => {
		const opt = {
			root: null,
			rootMargin: '0px',
			threshold: 1.0,
		}
		const observer = new IntersectionObserver(handlePage, opt)
		if (pokemonList.current) {
			console.log(a, 'AA')
			console.log(pokemonList.current)
			observer.observe(pokemonList.current)
		}
	}, [])
	return (
		<div className='pokemon-list'>
			<div className='inner-list'>
				{a.map((d, i) => (
					<PokemonCard key={i} />
				))}
				<p ref={pokemonList}>loadmore</p>
			</div>
		</div>
	)
}

export default PokemonList
