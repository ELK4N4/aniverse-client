import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import SearchBar from '../../../components/SearchBar/SearchBar';
import { Box, Container, Typography } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { Link as MuiLink } from '@material-ui/core/';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useStore } from '../../../stores';
import * as api from '../../../api';
import EpisodeCards from '../../../components/Cards/EpisodeCards';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

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
            <Paper className={classes.paper} elevation={5}>
                <div className={classes.watch}>
                    <iframe src={episode.link} frameBorder="0" allowFullScreen="" className={classes.iframe}></iframe>
                </div>

                <div className={classes.episodeDetails}>
                    <div className={classes.mainText}>
                        <Paper className={classes.animeTitlePaper} >
                            <Typography className={classes.animeName} variant="h5">
                                {anime.name.hebrew}
                            </Typography>
                        </Paper>
                        <Typography variant="h6" className={classes.episodeName}>
                                פרק&nbsp;
                                {episode.number}
                                &nbsp;-&nbsp;
                                {episode.name}
                        </Typography>
                    </div>
                    <Box display="flex" alignItems="center" className={classes.episodeTinyDetails}>
                        <VisibilityIcon />
                        <Typography variant="body2" className={classes.episodeTinyTypo}>
                            צפיות:&nbsp;
                            {episode.views}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" className={classes.episodeTinyDetails}>
                        <ScheduleIcon />
                        <Typography variant="body2" className={classes.episodeTinyTypo}>
                            פורסם בתאריך:&nbsp;
                            {new Date(episode.createdAt).toLocaleDateString()}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" className={classes.episodeTinyDetails}>
                        <PeopleAltIcon />
                        <Typography variant="body2" className={classes.episodeTinyTypo}>
                            הועלה על ידי:&nbsp;
                            <MuiLink component={Link} to={`/fansubs/${episode.addedByFansub._id}`} href="#">
                                {episode.addedByFansub.name}
                            </MuiLink>
                        </Typography>
                    </Box>
                </div>
            </Paper>
        )}
        </>
    )
}

export default Episode;
