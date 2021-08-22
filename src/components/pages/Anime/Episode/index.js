import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import SearchBar from '../../../SearchBar/SearchBar';
import { Container, Typography } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useStore } from '../../../../stores';
import * as api from '../../../../api';
import EpisodeCards from '../../../Cards/EpisodeCards';


function Episode({anime, episode}) {
    const { animeId, episodeId } = useParams();
    const store = useStore();
    const { userStore } = store;
    const classes = useStyles();

    useEffect(async () => {
        // store.startLoading();
        // try {
        //     const { data } = await api.fetchAnimeAndEpisode(animeId, episodeId);
        //     setEpisode(data);
        // } catch (err) {
        //     console.error(err.response);
        // } finally {
        //     store.stopLoading();
        // }
    }, [episodeId]);

    return (
        <>
        {episode && (
            <Container maxWidth="lg">
                <Paper className={classes.paper} elevation={20}>
                    <div className={classes.watch}>
                        <iframe src={episode.link} frameborder="0" allowfullscreen="" className={classes.iframe}></iframe>
                    </div>

                    <div className={classes.episodeDetails}>
                        <Paper className={classes.animeTitlePaper} >
                            <Typography variant="h5">
                                {anime.name.hebrew}
                            </Typography>
                        </Paper>
                        <Typography variant="h5">
                                פרק&nbsp;
                                {episode.number}
                                &nbsp;-&nbsp;
                                {episode.name}
                        </Typography>
                        <br />
                        <Typography variant="body" style={{margin: 10}}>
                                צפיות:&nbsp;
                                {episode.views}
                        </Typography>
                        <Typography variant="body" style={{margin: 10}}>
                                פורסם בתאריך:&nbsp;
                                {new Date(episode.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body" style={{margin: 10}}>
                                הועלה על ידי:&nbsp;
                                {episode.addedByFansub.name}
                        </Typography>
                    </div>
                </Paper>
            </Container>
        )}
        </>
    )
}

export default Episode;