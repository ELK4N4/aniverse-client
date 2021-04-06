import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import AnimeCard from './AnimeCard/AnimeCard';
import axios from 'axios';
import useStyles from './style';

export default function AnimeCards({ clickable, animes }) {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <Grid
            className={classes.root}
            container
            spacing={5}
            direction="row"
            justify="center"
            alignItems="center"
            //align="center"
            //justify="flex-start"
        >
            {animes.map((anime) => (
                <Grid item xs='auto' key={anime.name} key={anime._id} className={ clickable ? classes.card : null }>
                    <AnimeCard
                        name={anime.name}
                        summary={anime.summary}
                        img={anime.image}
                        showContent
                        timeout={500}
                    />
                </Grid>
            ))}
        </Grid >
    );
}