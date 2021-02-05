import React from 'react';
import PokemonTile from './PokemonTile';
import Grid from '@material-ui/core/Grid';
import Loader from './Loaders/Loader'
import InfiniteScroll from 'react-infinite-scroll-component';


const Home = ({ pokemonList, fetchMorePokemon, filterPokemon }) => {

    const style = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }

    return (
        <>
            <Grid item xs={12}>
                <ul>
                    <InfiniteScroll
                        dataLength={pokemonList.length}
                        next={fetchMorePokemon}
                        hasMore={true}
                        style={style}
                        loader={<Loader variant={'infinite-scroll'}/>}
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
            </Grid>
        </>
    );
}

export default Home;
