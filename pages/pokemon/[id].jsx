import { useEffect } from 'react'

import { useRouter } from 'next/router'
import CatchModal from '../../components/Modals/Catch-Modal'

const PokemonDetail = () => {
	const router = useRouter()

	return (
		<div className='pokemon-detail'>
			<div className='pokemon-detail-card'>
				<img className='pokemon-image' src='/assets/dino-big.png' alt='' />
				<h2 className='pokemon-name'>Dinosaur</h2>
				<div className='line'></div>
				<div className='container'>
					<div className='content'>
						<p>Moves : </p>
						<ul className='moves'>
							<li>Bubble Gun</li>
							<li>Fighting Ninja</li>
							<li>Lorem</li>
						</ul>
					</div>
					<div className='content'>
						<p>Types :</p>
						<ul className='moves'>
							<li>Grass Jelly</li>
							<li>Fighting Fire di</li>
						</ul>
					</div>
				</div>
				<button className="button">Catch Pokemon</button>
			</div>
			<CatchModal />
		</div>
	)
}

export default PokemonDetail
