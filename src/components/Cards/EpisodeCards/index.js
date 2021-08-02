import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import AnimeCard from './EpisodeCard';
import useStyles from './style';
import { useHistory, useParams } from 'react-router-dom';
import EpisodeCard from './EpisodeCard';

export default function EpisodeCards({ clickable, episodes }) {
    const classes = useStyles();
    const history = useHistory();
    const { animeId } = useParams();

    const handleClick = (episodeId) => {
        if(clickable) {
            history.push(animeId + '/episodes/' + episodeId);
        }
    }

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
            {episodes?.map((episode) => (
                <Grid item xs='auto' key={episode._id} className={clickable ? classes.card : null} onClick={() => handleClick(episode._id)}>
                    <EpisodeCard
                        name={episode.name}
                        number={episode.number}
                        image={episode.image}
                        showContent
                        timeout={500}
                    />
                </Grid>
            ))}
        </Grid >
    );
}