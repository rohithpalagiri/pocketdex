import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
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
        <li className="pokemonTile">
            <Link to={`/pokedex/${pokemonData.id}`}>
                {pokemonData.sprites ? <img src={pokemonData.sprites.front_default} /> : ''}
                <div>
                    {pokemonData.name}
                </div>
            </Link>
        </li>
    )
}

export default PokemonTile;

