import React from 'react'

const CatchModal = ({setOpenModal, catchPokemon, pokemonDetail}) => {

	const submitHandler = e => {
		e.preventDefault()
		catchPokemon(pokemonDetail.name)
	}

	return (
		<div className='catch-modal'>
			<div className='inner-modal'>
				<p onClick={() => setOpenModal(false)}>X</p>
				<img src={pokemonDetail.sprites?.front_default} alt='pokemon' />
				<p>Horray!! Success catch the pokemon!! Now let’s give him a name. {pokemonDetail.name}</p>
				<form onSubmit={submitHandler} className="form">
					<input type="text" className="input-name"/>
					<button>OK</button>
				</form>
			</div>
		</div>
	)
}

export default CatchModal
