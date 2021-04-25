
const ReleaseModal = ({pokemon, close, continueRelease}) => {
	return (
		<div className='release-modal'>
			<div className='inner-modal'>
				<img src={pokemon?.image} alt='pokemon' />
				<p>Are you sure to realese your pokemon?</p>
				<div className='buttons'>
					<button className='btn-no' onClick={close}>No</button>
					<button className='btn-ok' onClick={continueRelease}>Continue</button>
				</div>
			</div>
		</div>
	)
}

export default ReleaseModal
