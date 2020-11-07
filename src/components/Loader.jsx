import React from 'react';
import PikachuLoader from '../images/pikachu-running.gif';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    itemRoot: {
        display: 'flex',
        justifyContent: 'center',
    },
    typographyRoot: {
        marginTop: '1rem !important',
    }
}));

const Loader = () => {

    const classes = useStyles();

    return (

        <div className="loader-container">
            <Grid container>
                <Grid item className={classes.itemRoot} xs={12}>
                    <img className="loader-img" src={PikachuLoader} alt="pikachu-loader" />
                </Grid>
                <Grid item className={classes.itemRoot} xs={12}>
                    <Typography className={classes.typographyRoot} variant="h5">
                        Loading...
                    </Typography>
                </Grid>
            </Grid>


        </div>
    );
}

export default Loader;
