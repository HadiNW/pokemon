import Router from "next/router";
import NProgress from 'nprogress'

import Layout from '../components/Layout'
import { PokemonListProvider } from '../store/pokemon-list-context'

import '../styles/globals.scss'

Router.events.on('routeChangeStart', NProgress.start)
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

function MyApp({ Component, pageProps }) {
	return (
		<PokemonListProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</PokemonListProvider>
	)
}

export default MyApp
