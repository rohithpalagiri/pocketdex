import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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


const EvolutionChain = ({ evolutionChain }) => {

    const classes = useStyles();

    return (
        <Paper className="info-card" className={classes.paperRoot} elevation={3}>
            <Typography className={classes.typographyRoot} component={'div'}>
                <Grid container >
                    <Grid item xs={12} md={6} className={classes.GridContainer}>
                        
                    </Grid>
                </Grid>
            </Typography>
        </Paper>
    )
}

export default EvolutionChain;