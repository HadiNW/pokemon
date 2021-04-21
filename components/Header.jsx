const Header = () => {
	return (
		<header className='header'>
			<div className='menu list'>
				<img className='icon' src='/assets/poke-icon.png' alt='img' />
				<span>Pokemon List</span>
			</div>
			<div className='menu my-pokemon'>
				<img className='icon' src='/assets/poke-icon.png' alt='img' />
				<span>My Pokemon</span>
			</div>
		</header>
	)
}

export default Header