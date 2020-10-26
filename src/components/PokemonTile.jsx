import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Pokeball from '../images/pokeball.svg';
import classNames from "classnames"
import axios from "axios";

const PokemonTile = ({ data }) => {

    const [pokemonData, setPokemonData] = useState([]);
    const [hasMultipleTypes, setHasMultipleTypes] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get(data.url);
            let types = response.data.types.length > 1 ? true : false;
            setHasMultipleTypes(types);
            setPokemonData(response.data)
            return response;
        };

        fetchData();
    }, []);

    let tileClass;

    //TODO: There has to be a better way to run this
    if(pokemonData.types){
        if (hasMultipleTypes) {
            tileClass = classNames('pokemonTile', `primary-${pokemonData.types[0].type.name}`, `secondary-${pokemonData.types[1].type.name}`);
        } else {
            tileClass = classNames('pokemonTile', `solid-${pokemonData.types[0].type.name}`)
        }
    }
    

    return (
        <>
            {pokemonData.types && <li className={tileClass}>
                <Link to={`/pokedex/${pokemonData.id}`}>
                    {pokemonData.sprites ? <img src={pokemonData.sprites.front_default} /> : <img src={Pokeball} />}
                    <div className={"pokemon-name"}>
                        {pokemonData.name}
                    </div>
                </Link>
            </li>}
        </>

    )
}

export default PokemonTile;

