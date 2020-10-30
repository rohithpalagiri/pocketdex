import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    typeRowRoot: {
        display: 'flex',
        alignItems: 'center',
        // padding: '8px 0px'
    },
    damageValue: {
        fontSize: '0.75rem'
    }
});

const TypeEffective = ({ pkmTypes }) => {
    const [typeArray, setTypeArray] = useState([]);
    var TYPES = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel"];

    const classes = useStyles();

    var TYPE_ORDER = {
        normal: 0,
        fire: 1,
        water: 2,
        electric: 3,
        grass: 4,
        ice: 5,
        fighting: 6,
        poison: 7,
        ground: 8,
        flying: 9,
        psychic: 10,
        bug: 11,
        rock: 12,
        ghost: 13,
        dragon: 14,
        dark: 15,
        steel: 16
    };

    var TYPE_CHART = {
        normal: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5],
        fire: [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2],
        water: [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1],
        electric: [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1],
        grass: [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5],
        ice: [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5],
        fighting: [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2],
        poison: [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0],
        ground: [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2],
        flying: [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5],
        psychic: [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5],
        bug: [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5],
        rock: [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5],
        ghost: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5],
        dragon: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5],
        dark: [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5],
        steel: [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5]
    };

    useEffect(() => {
        let type1 = TYPE_ORDER[pkmTypes[0]]
        let type2 = TYPE_ORDER[pkmTypes[1]]

        let effectsArr = []

        if (pkmTypes.length > 1) {
            Object.keys(TYPE_CHART).map((key, index) => {
                let effect = TYPE_CHART[key][type1] * TYPE_CHART[key][type2]
                effectsArr.push(effect)
            })
        } else {
            Object.keys(TYPE_CHART).map((key, index) => {
                let effect = TYPE_CHART[key][type1]
                effectsArr.push(effect)
            })
        }
        setTypeArray(effectsArr)
    }, [pkmTypes]);

    return (
        <Paper className="info-card types" elevation={3}>
            <Typography component={'div'}>
                <Grid item className="type-row mb-2" xs={12}>
                    <Grid container>
                        <Grid item xs={12} md={2}>
                            <div className="mb-2"><b>Weak To</b></div>
                        </Grid>
                        <Grid item xs={12} md={10}>
                            {typeArray.map((x, index) => {
                                if (x > 1) {
                                    return <div className={`badge badge-${TYPES[index]}`}>{TYPES[index]} <span className={classes.damageValue}>{x}x</span></div>
                                }
                            })}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className="type-row mb-2" xs={12}>
                    <Grid container>
                        <Grid item xs={12} md={2}>
                            <div className="mb-2"><b>Normal Damage</b></div>
                        </Grid>
                        <Grid item xs={12} md={10}>
                            {typeArray.map((x, index) => {
                                if (x === 1) {
                                    return <div className={`badge badge-${TYPES[index]}`}>{TYPES[index]} <span className={classes.damageValue}>{x}x</span> </div>
                                }
                            })}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className="type-row" xs={12}>
                    <Grid container>
                        <Grid item xs={12} md={2}>
                            <div className="mb-2"><b>Resistant To</b></div>
                        </Grid>
                        <Grid item xs={12} md={10}>
                            {typeArray.map((x, index) => {
                                if (x < 1) {
                                    return <div className={`badge badge-${TYPES[index]}`}>{TYPES[index]} <span className={classes.damageValue}>{x}x</span></div>
                                }
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Typography>
        </Paper>
    )

}

export default TypeEffective