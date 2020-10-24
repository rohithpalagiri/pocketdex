import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import TypeColors from '../TypeColors';
import classNames from "classnames"
import axios from "axios";

const PokemonTile = ({ data }) => {

    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get(data.url);
            setPokemonData(response.data)
            return response;
        };

        fetchData();
    }, []);

    return (
        <>
            {pokemonData.types && <li className={"pokemonTile " + "primary-" + pokemonData.types[0].type.name + " " +  (pokemonData.types[1] ? "secondary-" + pokemonData.types[1].type.name : "")}>
                <Link to={`/pokedex/${pokemonData.id}`}>
                    {pokemonData.sprites ? <img src={pokemonData.sprites.front_default} /> : ''}
                    <div>
                        {pokemonData.name}
                    </div>
                </Link>
            </li>}
        </>

    )
}

export default PokemonTile;

