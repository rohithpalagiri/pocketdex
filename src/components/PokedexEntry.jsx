import React, { useState, useEffect } from 'react';
import StatsChart from './StatsChart';
import QuickInfo from './QuickInfo';
import Moves from './Moves';
import TypeEffective from './TypeEffective'
import userService from '../services/pokemon'
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Loader from './Loaders/Loader'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
    const [description, setDescription] = useState();
    const [stats, setStats] = useState([]);
    const [quickInfo, setQuickInfo] = useState({})
    const [moves, setMoves] = useState();

    useEffect(() => {

        (async () => {
            await userService.getPkm(pokemonKey).then((response) => {
                setPokemon(response.pkm)

                let pkm = response.pkm
                let species = response.species

                let genera = species.genera.filter((x) => x.language.name === "en")
                setGenus(genera[0].genus)

                let langDescription = species.flavor_text_entries.filter((x) => x.language.name === "en")
                setDescription(langDescription[0].flavor_text)

                let types = pkm.types.map((x) => x.type.name)
                setTypes(types)

                let stats = pkm.stats.map((x) => x.base_stat)
                setStats(stats)

                let moveSet = pkm.moves.map((x) => {
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

                let height = pkm.height;
                let weight = pkm.weight;
                let catchRate = species.capture_rate;
                let eggGroups = species.egg_groups.map((x) => x.name)
                let genderRate = species.gender_rate;
                let abilities = pkm.abilities.map((x) => x.ability.name)

                setQuickInfo({
                    height: height,
                    weight: weight,
                    catchRate: catchRate,
                    eggGroups: eggGroups,
                    genderRate: genderRate,
                    abilities: abilities
                })

                setIsLoaded(true)
            })
        })();
    }, []);

    const classes = useStyles();

    //Removes special character issues seen on Chromium based browsers
    function cleanStr(str) {
        return str.replace(/(?:\r\f|\r|\f)/g, ' ');
    }

    return (
        <React.Fragment>

            {!isLoaded && <div><Loader variant={'page'} /></div>}

            {isLoaded &&
                <div className="pocketdex-container">
                    <Grid item xs={12}>
                        <Typography variant="h3" gutterBottom>
                            #{pokemon.id}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <div className="header-container">
                            <div className="pokedex-image">
                                {pokemon.sprites.other["official-artwork"].front_default ?
                                    <img src={pokemon.sprites.other["official-artwork"].front_default} /> :
                                    <div class="img-placeholder"></div>
                                }
                            </div>

                            <div className="pokemon-entry">
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
                                    {cleanStr(description)}
                                </Typography>
                            </div>
                        </div>
                        
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


