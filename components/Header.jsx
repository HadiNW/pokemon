import Link from 'next/link'

const Header = () => {
	return (
		<header className='header'>
			<Link href='/'>
				<div className='menu list'>
					<>
						<img className='icon' src='/assets/poke-icon.png' alt='img' />
						<span>Pokemon List</span>
					</>
				</div>
			</Link>
			<Link href='/my-pokemon'>
				<div className='menu my-pokemon'>
					<img className='icon' src='/assets/poke-icon.png' alt='img' />
					<span>My Pokemon</span>
				</div>
			</Link>
		</header>
	)
}

export default Header
