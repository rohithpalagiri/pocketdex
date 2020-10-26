import React from 'react';
import PokemonTile from './PokemonTile';
import InfiniteScroll from 'react-infinite-scroll-component';


const Home = ({ pokemonList, fetchMorePokemon }) => {

    const style={
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }

    return (
        <>
            <ul>
                <InfiniteScroll
                    dataLength={pokemonList.length} //This is important field to render the next data
                    next={fetchMorePokemon}
                    hasMore={true}
                    style={style}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {pokemonList.map((x) => {
                        return <PokemonTile elevation={3} key={x.name} data={x} />
                    })}
                </InfiniteScroll>
            </ul>
        </>
    );
}

export default Home;
