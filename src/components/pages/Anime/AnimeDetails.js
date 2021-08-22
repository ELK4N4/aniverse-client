import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useStore } from '../../../stores';
import * as api from '../../../api';
import AnimeCard from '../../Cards/AnimeCards/AnimeCard';
import Episode from './Episode';
import Comments from './Comments';



function AnimeDetails({anime, episodes}) {
    const store = useStore();
    const { animeId, episodeId } = useParams();
    const { userStore } = store;
    const history = useHistory();
    const classes = useStyles();
    const [activeEpisode, setActiveEpisode] = useState();

    useEffect(async () => {
        setActiveEpisode(episodes.find(episode => episode._id === episodeId))
        console.log(anime)
    }, [episodeId]);

    const onEpisodeClick = (episodeId) => {
        history.push('/animes/' + animeId + '/episodes/' + episodeId);
    }

    return (
        <>
            <div className={classes.showcase} >
                <Container maxWidth="lg">
                    <Typography variant="h3" className={classes.animeName}>
                        { anime.name.hebrew }
                    </Typography>
                    <Typography variant="h5" className={classes.animeName}>
                        ז'אנר:
                        &nbsp;
                        { anime.genre }
                    </Typography>
                </Container>
            </div>
            <Container maxWidth="lg">
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
                            <Typography variant="body" className={classes.detailsTitle}>
                                תקציר
                            </Typography>
                            <Typography variant="body">
                                {anime.summary}
                            </Typography>

                            <Typography variant="body" className={classes.detailsTitle}>
                                פרקים
                            </Typography>
                            <Typography variant="body">
                                בחרו פרק
                            </Typography>
                            <Box display="flex" className={classes.episodesBtnsContainer} >
                                {episodes.map((episode) => (
                                    <Button onClick={() => onEpisodeClick(episode._id)} color="primary" variant={activeEpisode?._id === episode._id ? "outlined" : "contained"} disableElevation style={{margin: 4}}>
                                        {episode.number}
                                    </Button>
                                ))}
                                
                            </Box>
                        </div>
                    </Box>
                </Paper>
            </Container>

            <Episode anime={anime} episode={activeEpisode}/>
            <Comments />
        </>
    )
}

export default AnimeDetails;
