import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Layout from '../components/Layout'
import { PokemonListProvider } from '../store/pokemon-list-context';
import '../styles/globals.scss'

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  cache: new InMemoryCache({
	  typePolicies: {
		Query: {
		  fields: {
			pokemons: {
			  // Don't cache separate results based on
			  // any of this field's arguments.
			  keyArgs: false,
			  // Concatenate the incoming list items with
			  // the existing list items.
			  merge(existing = { results: [] }, incoming) {
				  return {
					  ...existing,
					  ...incoming,
					  results: [...existing.results, ...incoming.results]
				  }
			  },
			}
		  }
		}
	  }
  }),
});

function MyApp({ Component, pageProps }) {
  return (
	<PokemonListProvider>
	<ApolloProvider client={client}>
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</ApolloProvider>
	</PokemonListProvider>
  )
}

export default MyApp
