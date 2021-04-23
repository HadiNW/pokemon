import React from 'react'

const CatchFailed = ({ setCatchFailed, pokemon }) => {
	return (
		<div className='catch-modal'>
			<div className='inner-modal'>
				<img src={pokemon.sprites.front_default} alt='pokemon' />
				<p>Sorry the pokemon run away. Let’s catch again!!</p>
				<button className='btn-ok btn-catch-failed' onClick={() => setCatchFailed(false)}>Try Again</button>
			</div>
		</div>
	)
}

export default CatchFailed
