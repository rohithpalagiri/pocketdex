import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch, Route, Link, useParams
} from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import axios from "axios";

const PokedexEntry = () => {

    const pokemonKey = useParams().id

    const [pokemon, setPokemon] = useState([]);
    const [speciesData, setSpeciesData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            axios.all([
                axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonKey}`),
                axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonKey}`)
              ])
              .then(axios.spread((pokemonResponse, speciesReponse) => {
                setPokemon(pokemonResponse.data)
                setSpeciesData(speciesReponse.data)
              }))

              return
        };

        fetchData();
    }, []);

    console.log("Pokemon Object: ", pokemon)

    return (
        <React.Fragment>
            <Grid item xs={12} md={4}>
                <div className="pokedex-image">
                    {pokemon.sprites ? <img src={pokemon.sprites.other["official-artwork"].front_default} /> : "Loading..." }
                </div>
            </Grid>
            <Grid item xs={12} md={8}>
                {pokemon.name}
            </Grid >
        </React.Fragment>

    )
}

export default PokedexEntry;
