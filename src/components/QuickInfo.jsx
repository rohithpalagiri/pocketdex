import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Male from '../images/male.svg'
import Female from '../images/female.svg'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    GridContainer: {
        marginBottom: '1rem',
    },
    paperRoot: {
        height: '100%',
        padding: '25px',
    },
    typographyRoot: {
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
    }
}));

//TODO Need to fix loading animation of bars
const QuickInfo = ({ quickInfo }) => {

    const classes = useStyles();

    return (
        <Paper className="info-card" className={classes.paperRoot} elevation={3}>
            <Typography className={classes.typographyRoot} component={'div'}> 
                <Grid container >
                    <Grid item xs={12} md={6} className={classes.GridContainer}>
                        <b>Height:</b> {quickInfo.height / 10} m
                        </Grid>
                    <Grid item xs={12} md={6} className={classes.GridContainer}>
                        <b>Weight:</b> {quickInfo.weight / 100} kg
                        </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={6} className={classes.GridContainer}>
                        <b>Catch Rate:</b> {quickInfo.catchRate}
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.GridContainer}>
                        <b>Gender:</b> <img class="info-icon" src={Male} /> {(quickInfo.genderRate / 8) * 100}% <img class="info-icon ml-1" src={Female} />  {(1 - (quickInfo.genderRate / 8)) * 100}%
                         </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={6} className={classes.GridContainer}>
                        <b>Egg Groups:</b> {quickInfo.eggGroups && quickInfo.eggGroups.map((x, i) => <span key={i}>
                            {i > 0 && ", "}
                            {x}
                        </span>)}
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.GridContainer}>
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