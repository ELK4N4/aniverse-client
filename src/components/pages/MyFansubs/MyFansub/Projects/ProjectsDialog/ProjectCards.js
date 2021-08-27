import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';
import AnimeCard from '../../../../../Cards/AnimeCards/AnimeCard';

export default function ProjectCards({ clickable, animes, onProjectSelect}) {
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
                <Grid item xs='auto' key={anime._id} className={ clickable ? classes.card : null } onClick={() => onProjectSelect(anime)}>
                    <AnimeCard
                        name={anime.name.hebrew}
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