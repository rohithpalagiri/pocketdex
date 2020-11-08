import React, { useState, useEffect } from 'react';
import StatsChart from './StatsChart';
import QuickInfo from './QuickInfo';
import Moves from './Moves';
import TypeEffective from './TypeEffective'
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Loader from './Loader'
import Pokeball from '../images/pokeball.svg';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import axios from "axios";

const useStyles = makeStyles((theme) => ({
    GridContainer: {
        marginBottom: '1rem',
    },
    PkmEntry: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            marginLeft: '3rem',
        },
    },
    PkmSpecies: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        },
    }
}));

const PokedexEntry = () => {

    const pokemonKey = useParams().id

    const [isLoaded, setIsLoaded] = useState(false)
    const [pokemon, setPokemon] = useState([]);
    const [genus, setGenus] = useState("");
    const [types, setTypes] = useState([]);
    const [stats, setStats] = useState([]);
    const [quickInfo, setQuickInfo] = useState({})
    const [speciesData, setSpeciesData] = useState([]);
    const [moves, setMoves] = useState();

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

                    let stats = pokemonResponse.data.stats.map((x) => x.base_stat)
                    setStats(stats)

                    let moveSet = pokemonResponse.data.moves.map((x) => {
                        let name = x.move.name;

                        let lastDataModule = x.version_group_details.pop();
                        let learnedAt = lastDataModule.level_learned_at;
                        let method = lastDataModule.move_learn_method.name;

                        return {
                            move: x.move.name,
                            level: learnedAt,
                            method: method,
                        }
                    })

                    setMoves(moveSet);

                    let height = pokemonResponse.data.height;
                    let weight = pokemonResponse.data.weight;
                    let catchRate = speciesReponse.data.capture_rate;
                    let eggGroups = speciesReponse.data.egg_groups.map((x) => x.name)
                    let genderRate = speciesReponse.data.gender_rate;
                    let abilities = pokemonResponse.data.abilities.map((x) => x.ability.name)

                    setQuickInfo({
                        height: height,
                        weight: weight,
                        catchRate: catchRate,
                        eggGroups: eggGroups,
                        genderRate: genderRate,
                        abilities: abilities
                    })

                    setIsLoaded(true)

                }))

            return
        };

        fetchData();
    }, []);

    const classes = useStyles();

    //Removes special character issues seen on Chromium based browsers
    function cleanStr(str) {
        return str.replace(/(?:\r\f|\r|\f)/g, ' ');
    }

    return (
        <React.Fragment>

            {!isLoaded && <div><Loader /></div>}

            {isLoaded &&
                <div className="pocketdex-container">
                    <Grid item xs={12}>
                        <Typography variant="h3" gutterBottom>
                            #{pokemon.id}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12} md={2}>
                                <div className="pokedex-image">
                                    <img src={pokemon.sprites.other["official-artwork"].front_default ? pokemon.sprites.other["official-artwork"].front_default : Pokeball} />
                                </div>
                            </Grid>

                            <Grid item xs={12} md={9} className={classes.PkmEntry}>
                                <div className="pokemon-header-container">
                                    <Typography component={'div'}>
                                        <div className="pokemon-header">
                                            <Typography variant="h4" >
                                                {pokemon.name}
                                            </Typography>
                                            {types.map((x) => {
                                                return <div key={x} className={`badge badge-${x}`}>{x}</div>
                                            })}
                                        </div>
                                    </Typography>

                                    <Typography variant="h5" className={classes.PkmSpecies} gutterBottom>
                                        {genus}
                                    </Typography>

                                    <Typography variant="body1" gutterBottom>
                                        {cleanStr(speciesData.flavor_text_entries[1].flavor_text)}
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <StatsChart stats={stats} />

                        <Grid container spacing={3} className={classes.GridContainer}>
                            <Grid item xs={12} md={6}>
                                <QuickInfo quickInfo={quickInfo} />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TypeEffective pkmTypes={types} />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12}>
                                <Moves moves={moves} />
                            </Grid>
                        </Grid>
                    </Grid >
                </div>}

        </React.Fragment >

    )
}

export default PokedexEntry;


