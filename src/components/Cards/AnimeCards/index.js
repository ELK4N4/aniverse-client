import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import AnimeCard from './AnimeCard';
import useStyles from './style';
import { useHistory } from 'react-router-dom';

export default function AnimeCards({ clickable, direction="row", animes }) {
    const classes = useStyles();
    const history = useHistory();

    const handleClick = (animeId) => {
        if(clickable) {
            history.push('/animes/' + animeId);
        }
    }

    return (
        <Grid
            className={classes.root}
            container
            direction={direction}
            justifyContent="space-between"
            alignItems="center"
        >
            {animes.map((anime) => (
                <Grid item xs={5} sm={3} md={2} key={anime._id} className={clickable ? classes.card : null} onClick={() => handleClick(anime._id)}>
                    <AnimeCard
                        name={anime.name.hebrew}
                        summary={anime.summary}
                        img={anime.image}
                        showContent
                        timeout={500}
                        rating={anime.rating.avg}
                    />
                </Grid>
            ))}
        </Grid >
    );
}