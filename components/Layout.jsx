import React from 'react'
import Header from './Header'

const Layout = (props) => {
	return (
		<>
			<img className='background-page' src='/assets/background.png' alt='' />
			<Header />
			{props.children}
		</>
	)
}

export default Layout
