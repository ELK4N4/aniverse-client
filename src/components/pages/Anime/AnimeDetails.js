import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useStore } from '../../../stores';
import * as api from '../../../api';
import EpisodeCards from '../../Cards/EpisodeCards';
import AnimeCard from '../../Cards/AnimeCards/AnimeCard';



function AnimeDetails({anime}) {
    const store = useStore();
    const { userStore } = store;
    const classes = useStyles();

    useEffect(async () => {
        console.log(anime)
    }, []);

    return (
        <>
            <div className={classes.mainContainer}>
                <Grid container spacing={0} className={classes.showcase} >
                    <Grid item xs={12} md={9} sm={5} component={Box} display="flex" justifyContent="center">
                        <div>
                            <Paper elevation={7} className={classes.titlePaper}>
                                <Typography variant="h3" component="h2" >
                                    { anime.name.hebrew }
                                </Typography>
                            </Paper>
                            <Typography variant="h5" className={classes.summaryTitle}>
                                תקציר
                            </Typography>
                            <Typography variant="h6" className={classes.summaryContent}>
                                { anime.summary }
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={3} sm={7} component={Box} display="flex" justifyContent="center" alignItems="center">
                        <AnimeCard img={anime.image} width={300} height={450} name={anime.name} summary={anime.summary} showContent />
                    </Grid>
                </Grid>
                <Grid container spacing={0} className={classes.detailsContainer} >
                        <Grid item xs={12} sm={6} md={3}>
                            שם באנגלית:
                            &nbsp;
                            {anime.name.english}
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            שם ביפנית:
                            &nbsp;
                            {anime.name.japanese}
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            מספר פרקים:
                            &nbsp;
                            {anime.episodesNumber}
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            ז'אנר:
                            &nbsp;
                            {anime.genre}
                        </Grid>
                </Grid>
            </div>
        </>
    )
}

export default AnimeDetails;
