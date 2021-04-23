import { useState } from 'react'

const CatchModal = ({ savePokemon, pokemon }) => {

	const [customName, setCustomName] = useState('')

	const changeHandler = (e) => {
		setCustomName(e.target.value)
	}

	const submitHandler = e => {
		e.preventDefault()
		savePokemon({
			originalName: pokemon.name,
			customName,
		})
	}

	return (
		<div className='catch-modal'>
			<div className='inner-modal'>
				<img src={pokemon.sprites.front_default} alt='pokemon' />
				<p>Horray!! Success catch the pokemon!! Now let’s give him a name</p>
				<form className='form' onSubmit={submitHandler} >
					<input type='text' className='input-name' onChange={changeHandler} />
					<button className='btn-ok'>OK</button>
				</form>
			</div>
		</div>
	)
}

export default CatchModal
