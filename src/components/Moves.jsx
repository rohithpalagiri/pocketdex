import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import MoveList from '../moves.json'
import FullMovesDataSet from '../FullMovesDataSet.json'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AlbumIcon from '@material-ui/icons/Album';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: theme.typography.pxToRem(15),
    },
    accordionSummaryContent: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    paperRoot: {
        padding: '3rem',
    }
}));

//TODO Need to fix loading animation of bars
const Moves = ({ moves }) => {

    const [levelMoves, setLevelMoves] = useState()
    const [machineMoves, setMachineMoves] = useState()

    useEffect(() => {

        //Use this to grab all of the data

        // Promise.all(MoveList.map((x, index) => {
        //     return axios.get(x.url);
        // })).then((res) => {
        //     let final = []
        //     res.map((x) => {
        //         let id = x.data.id;
        //         let name= x.data.name;
        //         let accuracy = x.data.accuracy;
        //         let pp = x.data.pp;
        //         let power = x.data.power;
        //         let type = x.data.type.name;
        //         let classType = x.data.damage_class
        //         let description = x.data.flavor_text_entries.filter((x) => x.language.name === "en")[0]

        //         final.push({
        //             id: id,
        //             name: name,
        //             accuracy: accuracy,
        //             power: power,
        //             pp: pp,
        //             type: type,
        //             description: description,
        //             classType: classType
        //         })
        //     })
        // })
        if (moves) {
            let learnByLevel = moves.filter((x) => x.method === "level-up").sort((a, b) => a.level < b.level ? -1 : 1)
            setLevelMoves(learnByLevel)

            let learnByMachine = moves.filter((x) => x.method === "machine")
            setMachineMoves(learnByMachine)
        }

    }, [moves]);

    const classes = useStyles();

    return (
            <Paper className="info-card" elevation={3}>
                <Typography component={'div'}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h5" gutterBottom>
                                Level Up
                            </Typography>
                            {levelMoves && levelMoves.map((x) => {
                                let foundMove = FullMovesDataSet.find((n) => x.move === n.name)
                                return (
                                    <>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                classes={{
                                                    content: classes.accordionSummaryContent,
                                                }}
                                                aria-controls={`${x.move}-content`}
                                                id={x.move}
                                            >
                                                
                                                <div className="center">
                                                <div className="level-badge">
                                                    {x.level}
                                                </div>
                                                    <Typography className={classes.heading}>{x.move}</Typography>
                                                </div>
                                                <div>
                                                    <div className={`badge badge-${foundMove.type}`}>{foundMove.type}</div>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    {foundMove.description.flavor_text}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </>
                                )
                            })}

                            <Typography variant="h5" className="mt-3" gutterBottom>
                                TM
                            </Typography>
                            {machineMoves && machineMoves.map((x) => {
                                let foundMove = FullMovesDataSet.find((n) => x.move === n.name)
                                return (
                                    <div key={x.move}>
                                        <Accordion >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                classes={{
                                                    root: classes.accordionSummaryRoot,
                                                    content: classes.accordionSummaryContent,
                                                }}
                                                aria-controls={`${x.move}-content`}
                                                id={x.move}
                                            >
                                                <div>
                                                    <Typography className={classes.heading}>{x.move}</Typography>
                                                </div>
                                                <div>
                                                    <div className={`badge badge-${foundMove.type}`}>{foundMove.type}</div>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography variant="body1">
                                                    {foundMove.description.flavor_text}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Typography>
            </Paper>

    )
}

export default Moves