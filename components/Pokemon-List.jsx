import PokemonCard from './Pokemon-Card'
import Spinner from './Spinner'

const PokemonList = ({
	pokemons,
	fetchMore,
	fetchMoreLoading,
	nextUrl,
	title,
	type,
	handleRelease,
	isLoading
}) => {

	return (
		<div className='pokemon-list'>
			<h2 className='title'>{title}</h2>
			<div className='inner-list'>
				{!pokemons?.length && !isLoading && <p className='no-data'>No Data</p>}
				{pokemons?.map((pokemon, i) => (
					<PokemonCard key={pokemon.name + i} pokemon={pokemon} type={type} handleRelease={handleRelease} />
				))}
			</div>
			<div className='loadmore'>
				{type === 'owned' && (
					<>
						{fetchMoreLoading ? (
							<Spinner />
						) : (
							<button className='btn-loadmore' onClick={() => fetchMore(nextUrl)}>Load More</button>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default PokemonList
