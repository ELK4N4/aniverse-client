import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import SearchBar from '../../SearchBar/SearchBar';
import { Box, Button, Container, Typography } from '@material-ui/core';
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
import AnimeDetails from './AnimeDetails';
import Episode from './Episode';
import Comments from './Comments';
import { useIsMount } from '../../../hooks/useIsMount';
import CommentDialog from './CommentDialog';


function Anime() {
    const { animeId, episodeId } = useParams();
    const store = useStore();
    const { userStore } = store;
    const classes = useStyles();
    const [anime, setAnime] = useState();
    const [episodes, setEpisodes] = useState();
    const [activeEpisode, setActiveEpisode] = useState();
    const [open, setOpen] = useState(false);
    const isMount = useIsMount();
    

    useEffect(async () => {
        if(isMount) {
            store.startLoading();
            try {
                const { data } = await api.fetchAnime(animeId);
                console.log(anime, data)
                setAnime(data);
                const episodes = await api.fetchEpisodes(animeId);
                console.log("episodes.data", episodes.data)
                setEpisodes(episodes.data);
                setActiveEpisode(episodes.data.find(episode => episode._id === episodeId))
            } catch (err) {
                console.error(err.response);
            } finally {
                store.stopLoading();
            }
        } else {
            setActiveEpisode(episodes.find(episode => episode._id === episodeId))
        }
    }, [episodeId]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {(anime && episodes) && (
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
                    <Container maxWidth="lg" className={classes.containers}>
                        <AnimeDetails anime={anime} episodes={episodes} activeEpisode={activeEpisode}/>
                        {activeEpisode && (
                            <>
                            <Episode anime={anime} episode={activeEpisode}/>
                            <Box display="flex">
                                <Typography variant="h5" className={classes.commentsTitle}>
                                    {`תגובות (${0})`}
                                </Typography>
                                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                                    הוסף תגובה +
                                </Button>
                                <CommentDialog open={open} handleClose={() => setOpen(false)} />
                            </Box>
                            <Comments />
                            </>
                        )}
                        
                    </Container>
                </>
            )}
        </>
    )
}

export default Anime;
