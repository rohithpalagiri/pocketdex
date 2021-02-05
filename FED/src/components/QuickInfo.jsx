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
        backgroundColor: 'aliceBlue',
        width: '100%',
    },
    typographyRoot: {
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
    }
}));

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const QuickInfo = ({ quickInfo }) => {

    const classes = useStyles();

    let genderRatio = (rate) => {
        return (<><img className="info-icon" src={Male} /> {(rate / 8) * 100}% <img className="info-icon ml-1" src={Female} />  {(1 - (rate / 8)) * 100}%</>)
    }

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
                        <b>Gender:</b> {quickInfo.genderRate === -1 ? 'N/A' : genderRatio(quickInfo.genderRate)}
                         </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={6} className={classes.GridContainer}>
                        <b>Egg Groups:</b> {quickInfo.eggGroups && quickInfo.eggGroups.map((x, i) => <span key={i}>
                            {i > 0 && ", "}
                            {capitalize(x)}
                        </span>)}
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.GridContainer}>
                        <b>Abilities:</b> {quickInfo.abilities && quickInfo.abilities.map((x, i) => <span key={i}>
                            {i > 0 && ", "}
                            {capitalize(x)}
                        </span>)}
                    </Grid>
                </Grid>
            </Typography>
        </Paper>
    )
}

export default QuickInfo