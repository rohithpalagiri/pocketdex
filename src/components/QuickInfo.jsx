import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//TODO Need to fix loading animation of bars
const QuickInfo = ({ quickInfo }) => {

    return (
        <Grid container class="quickinfo-card">
            <Paper elevation={3}>
            <Typography>
                <Grid container>
                    <Grid item xs={6}>
                        Height: {quickInfo.height / 10} m
                </Grid>
                    <Grid item xs={6}>
                        Weight: {quickInfo.weight / 100} kg
                </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        Catch Rate: {quickInfo.catchRate}
                    </Grid>
                    <Grid item xs={6}>
                        Gender: Male {(quickInfo.genderRate / 8) * 100}% Female {(1 - (quickInfo.genderRate / 8)) * 100}%
                </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        Egg Groups: {quickInfo.eggGroups && quickInfo.eggGroups.map((x, i) => <span key={i}>
                        {i > 0 && ", "}
                        {x}
                    </span>)}
                    </Grid>
                    <Grid item xs={6}>
                        Abilities: {quickInfo.abilities && quickInfo.abilities.map((x, i) => <span key={i}>
                        {i > 0 && ", "}
                        {x}
                    </span>)}
                    </Grid>
                </Grid>
            </Typography>
            </Paper>
        </Grid>

    )
}

export default QuickInfo