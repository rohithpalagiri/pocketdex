import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//TODO Need to fix loading animation of bars
const QuickInfo = ({ quickInfo }) => {

    return (
        <Paper className="info-card" elevation={3}>
            <Typography component={'div'}> 
                <Grid container>
                    <Grid item xs={6}>
                        <b>Height:</b> {quickInfo.height / 10} m
                        </Grid>
                    <Grid item xs={6}>
                        <b>Weight:</b> {quickInfo.weight / 100} kg
                        </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        <b>Catch Rate:</b> {quickInfo.catchRate}
                    </Grid>
                    <Grid item xs={6}>
                        <b>Gender:</b> Male {(quickInfo.genderRate / 8) * 100}% Female {(1 - (quickInfo.genderRate / 8)) * 100}%
                         </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        <b>Egg Groups:</b> {quickInfo.eggGroups && quickInfo.eggGroups.map((x, i) => <span key={i}>
                            {i > 0 && ", "}
                            {x}
                        </span>)}
                    </Grid>
                    <Grid item xs={6}>
                        <b>Abilities:</b> {quickInfo.abilities && quickInfo.abilities.map((x, i) => <span key={i}>
                            {i > 0 && ", "}
                            {x}
                        </span>)}
                    </Grid>
                </Grid>
            </Typography>
        </Paper>
    )
}

export default QuickInfo