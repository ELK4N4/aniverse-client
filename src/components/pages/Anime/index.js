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
import { Link, useLocation, useParams } from 'react-router-dom';
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
    const { animeId } = useParams();
    const store = useStore();
    const location = useLocation();
    const history = useHistory();
    const params = new URLSearchParams(location.search);
    const fansubId = params.get('fansub') || 'recommended';
    const episodeId = params.get('episode');
    const { userStore } = store;
    const classes = useStyles();
    const [anime, setAnime] = useState();
    const [episodes, setEpisodes] = useState();
    const [currentEpisode, setCurrentEpisode] = useState();
    const [clickedEpisode, setClickedEpisode] = useState();
    const [choosenFansub, setChoosenFansub] = useState('recommended');
    const [comments, setComments] = useState([]);
    const [updatedComment, setUpdatedComment] = useState();
    const [open, setOpen] = useState(false);
    const isMount = useIsMount();
    

    useEffect(async () => {
        setChoosenFansub(fansubId);
        if(isMount) {
            store.startLoading();
            try {
                const { data } = await api.fetchAnime(animeId);
                setAnime(data);
                let currentProject;
                if(!data.recommended) {
                    currentProject = data.projects[0];
                    setChoosenFansub(currentProject.fansub._id);
                } else if(fansubId === 'recommended') {
                    currentProject = data.recommended;
                } else {
                    currentProject = data.projects.find(project => project.fansub._id === fansubId);
                    setChoosenFansub(currentProject.fansub._id);
                }
                setEpisodes(currentProject.episodes);
                if(episodeId) {
                    setClickedEpisode(currentProject.episodes.find(episode => episode._id === episodeId))
                    const episodeRes = await api.fetchEpisode(animeId, episodeId);
                    setCurrentEpisode(episodeRes.data);
                    const commentsRes = await api.fetchComments(animeId, episodeId);
                    setComments(commentsRes.data);
                }
            } catch (err) {
                console.error(err.response);
            } finally {
                store.stopLoading();
            }
        } else {
            let currentProject;
            if(!anime.recommended) {
                currentProject = anime.projects[0];
            } else if(fansubId === 'recommended') {
                currentProject = anime.recommended;
            } else {
                currentProject = anime.projects.find(project => project.fansub._id === fansubId);
            }
            setEpisodes(currentProject.episodes)
            if(episodeId) {
                setClickedEpisode(currentProject.episodes.find(episode => episode._id === episodeId))
                store.startLoading();
                try {
                    const episodeRes = await api.fetchEpisode(animeId, episodeId);
                    setCurrentEpisode(episodeRes.data);
                    const commentsRes = await api.fetchComments(animeId, episodeId);
                    setComments(commentsRes.data);
                } catch (err) {
                    console.error(err.response);
                } finally {
                    store.stopLoading();
                }
            }
        }
    }, [episodeId, fansubId]);

    const handleClose = () => {
        setOpen(false);
    };

    const changeFansub = (fansub) => {
        setCurrentEpisode(null);
        setClickedEpisode(null);
        setChoosenFansub(fansub);
        history.push('/animes/' + animeId + '/episodes' + '?fansub=' + fansub);
    }

    const openCommentDialog = () => {
        setOpen(true);
        setUpdatedComment(undefined);
    }

    const addComment = async (comment) => {
        try {
            const { data } = await api.addComment(animeId, episodeId, comment);
            const commentTemp = [...comments];
            commentTemp.push(data)
            setComments(commentTemp);
        } catch (err) {
            console.error(err.response);
        }
    }

    const removeComment = async (commentId) => {
        try {
            const { data } = await api.removeComment(animeId, episodeId, commentId);
            const updatedComments = comments.filter((comment) => comment._id !== commentId);
            setComments(updatedComments);
        } catch (err) {
            console.error(err.response);
        }
    }

    const editComment = (comment) => {
        setUpdatedComment(comment);
        setOpen(true);
    }

    const updateComment = async (updatedComment) => {
        try {
            const { data } = await api.updateComment(animeId, episodeId, updatedComment._id, updatedComment);
            const editCommentIndex = comments.findIndex(comment => comment._id === updatedComment._id);
            const commentTemp = [...comments];
            commentTemp[editCommentIndex] = data;
            setComments(commentTemp);
            setUpdatedComment(undefined);
        } catch (err) {
            console.error(err.response);
        }
    }

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
                                { anime.genres.join(", ") }
                            </Typography>
                        </Container>
                    </div>
                    <Container maxWidth="lg" className={classes.containers}>
                        <AnimeDetails anime={anime} projects={anime.projects} episodes={episodes} choosenFansub={choosenFansub} changeFansub={changeFansub} clickedEpisode={clickedEpisode}/>
                        {currentEpisode && (
                            <>
                                <Episode anime={anime} episode={currentEpisode}/>
                                <Box display="flex">
                                    <Typography variant="h5" className={classes.commentsTitle}>
                                        {`תגובות (${comments.length})`}
                                    </Typography>
                                    <Button variant="contained" color="primary" onClick={openCommentDialog}>
                                        הוסף תגובה +
                                    </Button>
                                    <CommentDialog onSumbit={updatedComment ? updateComment : addComment} updatedComment={updatedComment} open={open} handleClose={handleClose} />
                                </Box>
                                <Comments comments={comments} removeComment={removeComment} editComment={editComment} />
                            </>
                        )}
                        
                    </Container>
                </>
            )}
        </>
    )
}

export default Anime;
