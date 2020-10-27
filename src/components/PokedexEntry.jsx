import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from "axios";

const PokedexEntry = () => {

    const pokemonKey = useParams().id

    const [pokemon, setPokemon] = useState([]);
    const [genus, setGenus] = useState("");
    const [types, setTypes] = useState([]);
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

                    let genera = speciesReponse.data.genera.filter((x) => x.language.name === "en")
                    setGenus(genera[0].genus)

                    let types = pokemonResponse.data.types.map((x) => x.type.name)
                    setTypes(types)
                }))

            return
        };

        fetchData();
    }, []);

    // console.log("Pokemon Object: ", pokemon)

    //TODO how to wait for API to finish before rendering data so no need for all these ternary functions
    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Typography variant="h3">
                    #{pokemon.id}
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <div className="pokedex-image">
                    {pokemon.sprites ? <img src={pokemon.sprites.other["official-artwork"].front_default} /> : "Loading..."}
                </div>
            </Grid>
            <Grid item xs={12} md={8}>
                <Typography>
                    <div className="pokemon-header">
                        <Typography variant="h4" >
                            {pokemon.name}
                        </Typography>
                        {types.map((x) => {
                            return <div className={`badge badge-${x}`}>{x}</div>
                        })}
                    </div>
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {speciesData.genera ? genus : "no genus"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {speciesData.flavor_text_entries ? speciesData.flavor_text_entries[1].flavor_text : "no text"}
                </Typography>

            </Grid >
        </React.Fragment>

    )
}

export default PokedexEntry;
