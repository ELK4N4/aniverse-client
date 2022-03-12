import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';
import AnimeCard from '../../../../../components/Cards/AnimeCards/AnimeCard';

export default function ProjectCards({ clickable, animes, onProjectSelect}) {
    const classes = useStyles();
    return (
        <Grid
            className={classes.root}
            container
            spacing={5}
            direction="row"
            justifyContent="center"
            alignItems="center"
            //align="center"
            //justify="flex-start"
        >
            {animes.map((anime) => (
                <Grid item xs='auto' key={anime._id} className={ clickable ? classes.card : null } onClick={() => onProjectSelect(anime)}>
                    <AnimeCard
                        name={anime.name.hebrew}
                        summary={anime.summary}
                        img={anime.image ? anime.image : "https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png"}
                        showContent
                        timeout={500}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src="https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png";
                        }}
                    />
                </Grid>
            ))}
        </Grid >
    );
}