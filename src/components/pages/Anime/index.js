import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import SearchBar from '../../SearchBar/SearchBar';
import { Box, Container } from '@material-ui/core';
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
import EpisodesContainer from './EpisodesContainer';


function Anime() {
    const { animeId } = useParams();
    const store = useStore();
    const { userStore } = store;
    const classes = useStyles();
    const [anime, setAnime] = useState();
    const [episodes, setEpisodes] = useState();

    useEffect(async () => {
        store.startLoading();
        try {
            const { data } = await api.fetchAnime(animeId);
            console.log(anime, data)
            setAnime(data);
            const episodes = await api.fetchEpisodes(animeId);
            console.log("episodes.data", episodes.data)
            setEpisodes(episodes.data);
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    }, []);

    return (
        <>
                {anime && <AnimeDetails anime={anime}/> }
                <div style={{marginTop: 50}} />
                {episodes && <EpisodesContainer episodes={episodes}/> }
                <div style={{marginTop: 80}} />

        </>
    )
}

export default Anime;
