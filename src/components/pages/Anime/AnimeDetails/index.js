import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import useStyles from './style';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useStore } from '../../../../stores';



function AnimeDetails({anime, projects, episodes, choosenFansub, changeFansub, clickedEpisode}) {
    const store = useStore();
    const location = useLocation();
    const history = useHistory();
    const { animeId, episodeId } = useParams();
    const params = new URLSearchParams(location.search);
    const fansubId = choosenFansub;
    const { userStore } = store;
    const classes = useStyles();

    useEffect(() => {
        console.log('choosenFansub')
    })

    const onEpisodeClick = (episodeId) => {
        history.push('/animes/' + animeId + '/episodes?fansub=' + fansubId + '&episode=' + episodeId);
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
                        <Box display="flex" alignItems="center" className={classes.episodesTitlesHeader}>
                            <Typography variant="body1" className={classes.detailsTitle}>
                                פרקים
                            </Typography>
                            {choosenFansub && (
                                <FormControl size="small" variant="outlined" fullWidth>
                                    <InputLabel id="select-fansub-label">פאנסאב</InputLabel>
                                    <Select
                                        labelId="choosen-fansub-label"
                                        id="choosen-fansub"
                                        value={choosenFansub}
                                        onChange={(e) => changeFansub(e.target.value)}
                                        label="פאנסאב"
                                    >
                                    {projects.map((project) => (
                                        <MenuItem key={project.fansub._id} value={project.fansub._id}>
                                            {project.fansub.name}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                            )}
                        </Box>
                        
                        {episodes.length === 0 ? (
                            <Typography variant="body1">
                                אין פרקים עדיין לאנימה זו
                            </Typography>
                        ) : (
                            <Typography variant="body1">
                                בחרו פרק
                            </Typography>
                        )}

                        <Box display="flex" className={classes.episodesBtnsContainer} >
                            {episodes.map((episode) => (
                                <Button key={episode._id} onClick={() => onEpisodeClick(episode._id)} color="primary" variant={clickedEpisode?._id === episode._id ? "outlined" : "contained"} disableElevation style={{margin: 4}}>
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
