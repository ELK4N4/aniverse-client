import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import SearchBar from '../../SearchBar/SearchBar';
import { Box, Container, Typography } from '@material-ui/core';
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


function EpisodesContainer({episodes}) {
    const store = useStore();
    const { userStore } = store;
    const classes = useStyles();

    return (
        <>
            <Paper elevation={7} className={classes.episodesTitlePaper}>
                <Typography variant="h4" align="center" display="inline-block">
                    פרקים
                </ Typography>
            </ Paper>
            <EpisodeCards clickable episodes={episodes}/>
        </>
    )
}

export default EpisodesContainer;
