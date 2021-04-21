import { useEffect } from 'react'
import PokemonCard from '../components/Pokemon-Card'
import PokemonList from '../components/Pokemon-List'

const Home = () => {
	return (
		<div className='home-page'>
			<PokemonList />
		</div>
	)
}

export default Home
