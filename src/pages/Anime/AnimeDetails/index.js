import React, { useState, useEffect, useRef, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import useStyles from './style';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Tooltip, Typography, Zoom } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useStore } from '../../../stores';
import { Rating } from '@material-ui/lab';
import * as api from '../../../api';
import { useSnackbar } from 'notistack';
import errorMessage from '../../../errorMessage';

const trackingStatus = [
    "בצפייה",
    "נצפה",
    "מתוכנן",
    "נזרק",
]

function AnimeDetails({anime, projects, episodes, choosenFansub, changeFansub, clickedEpisode}) {
    const store = useStore();
    const location = useLocation();
    const history = useHistory();
    const { animeId, episodeId } = useParams();
    const params = new URLSearchParams(location.search);
    const fansubId = choosenFansub;
    const { userStore } = store;
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const [tracking, setTracking] = useState(anime.tracking);
    const [rating, setRating] = useState({
        avg: anime.rating?.avg,
        userRating: anime.rating?.userRating
    });
    const [ratingHover, setRatingHover] = useState(false);
    const ratingDisplay = useMemo(() => {
        return rating.userRating?.score || rating.avg;
    }, [rating]);

    const onEpisodeClick = (episodeId) => {
        history.push('/animes/' + animeId + '/episodes?fansub=' + fansubId + '&episode=' + episodeId);
    }

    const onRatingChange = async (event, newValue) => {
        let ratingRes;
        store.startLoading();
        try {
            if(newValue == null) {
                if(rating.userRating?.score) {
                    ratingRes = await api.deleteRating(animeId, rating.userRating._id);
                } else {
                    ratingRes = await api.addRating(animeId, rating.avg);
                }
            } else {
                if(rating.userRating?.score) {
                    ratingRes = await api.updateRating(animeId, rating.userRating._id, newValue);
                } else {
                    ratingRes = await api.addRating(animeId, newValue);
                }
            }
    
            const { data } = ratingRes;
            setRating(data);
            enqueueSnackbar('הדירוג עודכן', {variant: 'success'});
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }

    const changeTrackingStatus = async (newValue) => {
        let trackingRes;
        store.startLoading();
        try {
            if(tracking) {
                trackingRes = await api.updateAnimeTracking(animeId, tracking._id, {status: newValue});
            } else {
                trackingRes = await api.addAnimeTracking(animeId, {status: newValue});
            }
    
            const { data } = trackingRes;
            setTracking(data);
            enqueueSnackbar('מעקב אנימה עודכן', {variant: 'success'});
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }
    
    const ratingStyle = () => {
        if(rating.userRating != null || ratingHover) {
            return {color: '#E23D28'};
        } else {
            return {};
        }
    }

    return (
        <>
            <Paper elevation={5} className={classes.detailsContainer}>
                <Box display="flex" className={classes.mainBox}>
                    <Box className={classes.metadataBox}>
                        <div>
                            <img src={anime.image} width="200" height="300" className={classes.animeImage} />
                            <Box display="flex" alignItems="center">
                                <Rating
                                    style={ratingStyle()}
                                    name="simple-controlled"
                                    size="large"
                                    value={ratingDisplay}
                                    onChange={onRatingChange}
                                    onMouseOver={() => setRatingHover(true)}
                                    onMouseLeave={() => setRatingHover(false)}
                                    disabled={!userStore.user}
                                />
                                <Tooltip title="דירוג כללי" interactive TransitionComponent={Zoom} placement="buttom">
                                    <Typography variant="h6" className={classes.detailsRatingNumber}>
                                        ({Math.round(rating.avg * 10) / 10 || 'ללא'})
                                    </Typography>
                                </Tooltip>
                            </Box>
                                <br/>
                                <Typography variant="body1" className={classes.metadataText}>
                                    <FormControl size="small" variant="outlined" fullWidth>
                                        <InputLabel id="select-fansub-label">בחר סטטוס צפייה</InputLabel>
                                        <Select
                                            labelId="choosen-fansub-label"
                                            id="choosen-fansub"
                                            value={tracking?.status}
                                            onChange={(e) => changeTrackingStatus(e.target.value)}
                                            label="בחר סטטוס צפייה"
                                        >
                                        {trackingStatus.map((status) => (
                                            <MenuItem key={status} value={status}>
                                                {status}
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                </Typography>
                                <br/>
                                <Typography variant="body1" className={classes.metadataText}>
                                    מספר פרקים:&nbsp;
                                    {anime.episodesNumber}
                                </Typography>
                                <Typography variant="body1" className={classes.metadataText}>
                                    מוגן בזכויות יוצרים:&nbsp;
                                    {anime.copyright ? "כן" : "לא"}
                                </Typography>
                        </div>
                    </Box>
                    <div>
                        <Typography variant="body1" className={classes.detailsTitle}>
                            תקציר
                        </Typography>
                        <Typography variant="body1">
                            {anime.summary}
                        </Typography>
                        {!anime.copyright && 
                            <>
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
                            </>
                        }
                        
                    </div>
                </Box>
            </Paper>
        </>
    )
}

export default observer(AnimeDetails);
