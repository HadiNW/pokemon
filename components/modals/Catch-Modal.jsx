import { useState } from 'react'

const CatchModal = ({ savePokemon, pokemon, error }) => {
	const [customName, setCustomName] = useState('')

	const changeHandler = (e) => {
		setCustomName(e.target.value)
	}

	const submitHandler = (e) => {
		e.preventDefault()
		console.log('submit')
		savePokemon({
			originalName: pokemon.name,
			customName,
			image: pokemon.sprites.front_default,
		})
	}

	return (
		<div className='catch-modal'>
			<div className='inner-modal'>
				<img src={pokemon.sprites.front_default} alt='pokemon' />
				<p>Horray!! Success catch the pokemon!! Now let’s give him a name {error}</p>
				{error && <p className='text-error'>{error}</p>}
				<form className='form' onSubmit={submitHandler}>
					<input type='text' className='input-name' onChange={changeHandler} />
					<button className='btn-ok'>OK</button>
				</form>
			</div>
		</div>
	)
}

export default CatchModal
