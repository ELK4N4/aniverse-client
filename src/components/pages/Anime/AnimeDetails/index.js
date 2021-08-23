import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import useStyles from './style';
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../../../../stores';



function AnimeDetails({anime, episodes, activeEpisode}) {
    const store = useStore();
    const { animeId, episodeId } = useParams();
    const { userStore } = store;
    const history = useHistory();
    const classes = useStyles();

    const onEpisodeClick = (episodeId) => {
        history.push('/animes/' + animeId + '/episodes/' + episodeId);
    }

    return (
        <>
            <Paper elevation={5} className={classes.detailsContainer}>
                <Box display="flex">
                    <div style={{ padding: 20, width: '250px'}}>
                        <img src={anime.image} width="200" height="300" style={{borderRadius: '40px', objectFit: 'cover'}} />
                        <div>
                            מספר פרקים:
                            &nbsp;
                            {anime.episodesNumber}
                        </div>
                    </div>
                    <div style={{ padding: 20}}>
                        <Typography variant="body1" className={classes.detailsTitle}>
                            תקציר
                        </Typography>
                        <Typography variant="body1">
                            {anime.summary}
                        </Typography>

                        <Typography variant="body1" className={classes.detailsTitle}>
                            פרקים
                        </Typography>
                        <Typography variant="body1">
                            בחרו פרק
                        </Typography>
                        <Box display="flex" className={classes.episodesBtnsContainer} >
                            {episodes.map((episode) => (
                                <Button key={episode._id} onClick={() => onEpisodeClick(episode._id)} color="primary" variant={activeEpisode?._id === episode._id ? "outlined" : "contained"} disableElevation style={{margin: 4}}>
                                    {episode.number}
                                </Button>
                            ))}
                            
                        </Box>
                    </div>
                </Box>
            </Paper>
        </>
    )
}

export default AnimeDetails;
