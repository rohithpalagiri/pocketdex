import React from 'react';
import PokemonTile from './PokemonTile';

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
