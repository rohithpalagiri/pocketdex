import React from 'react';
import PokemonTile from './PokemonTile';
import InfiniteScroll from 'react-infinite-scroll-component';
import loadReducer from '../reducers/loadReducer'
import { useDispatch } from 'react-redux'


const Home = ({ pokemonList }) => {

    return (
        <div className="pocketdex-wrapper">
            <ul>
                {pokemonList.map((x) => {
                    return <PokemonTile key={x.name} data={x} />
                })}
            </ul>
        </div>
    );
}

export default Home;
