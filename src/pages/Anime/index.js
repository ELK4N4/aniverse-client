import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import { Box, Button, Container, Grow, Typography } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useHistory } from 'react-router';
import { Link, useLocation, useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import { useStore } from '../../stores';
import * as api from '../../api';
import EpisodeCards from '../../components/Cards/EpisodeCards';
import AnimeDetails from './AnimeDetails';
import Episode from './Episode';
import Comments from './Comments';
import { useIsMount } from '../../hooks/useIsMount';
import CommentDialog from '../../components/CommentDialog';
import { useSnackbar } from 'notistack';
import errorMessage from '../../errorMessage';


function Anime() {
    let { animeId } = useParams();
    const store = useStore();
    const { userStore } = store;
    const location = useLocation();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const params = new URLSearchParams(location.search);
    const fansubId = params.get('fansub');
    const episodeId = params.get('episode');
    const classes = useStyles();
    const [anime, setAnime] = useState();
    const [episodes, setEpisodes] = useState([]);
    const [currentEpisode, setCurrentEpisode] = useState();
    const [clickedEpisode, setClickedEpisode] = useState();
    const [choosenFansub, setChoosenFansub] = useState();
    const [comments, setComments] = useState([]);
    const [updatedComment, setUpdatedComment] = useState();
    const [repliedComment, setRepliedComment] = useState();
    const [open, setOpen] = useState(false);
    const isMount = useIsMount();
    const episodeRef = useRef(null);

    useEffect(async () => {
        if(isMount) {
            store.startLoading();
            try {
                const animeRes = await api.fetchAnime(animeId);
                setAnime(animeRes.data);
                let currentProject;
                if(animeRes.data.projects.length === 1) {
                    currentProject = animeRes.data.projects[0];
                } else if(animeRes.data.projects.length > 1) {
                    if(fansubId) {
                        currentProject = animeRes.data.projects.find(project => project.fansub._id === fansubId);
                    } else {
                        currentProject= animeRes.data.projects[0];
                    }
                }
                setChoosenFansub(currentProject.fansub._id);
                setEpisodes(currentProject.episodes);
                if(episodeId) {
                    setClickedEpisode(currentProject.episodes.find(episode => episode._id === episodeId))
                    const episodeRes = await api.fetchEpisode(animeId, episodeId);
                    setCurrentEpisode(episodeRes.data);
                    const commentsRes = await api.fetchComments(animeId, episodeId);
                    setComments(commentsRes.data);
                    episodeRef.current.scrollIntoView({ behavior: 'smooth', block: "center"});
                }
            } catch (err) {
                console.error(err.response);
            } finally {
                store.stopLoading();
            }
        } else {
            store.startLoading();
            try {
                let currentProject;
                if(anime.projects.length === 1) {
                    currentProject = anime.projects[0];
                } else if(anime.projects.length > 1) {
                    if(fansubId) {
                        currentProject = anime.projects.find(project => project.fansub._id === fansubId);
                    } else {
                        currentProject= anime.projects[0];
                    }
                }
                setChoosenFansub(currentProject.fansub._id);
                setEpisodes(currentProject.episodes);
                if(episodeId) {
                    setClickedEpisode(currentProject.episodes.find(episode => episode._id === episodeId))
                    const episodeRes = await api.fetchEpisode(animeId, episodeId);
                    setCurrentEpisode(episodeRes.data);
                    const commentsRes = await api.fetchComments(animeId, episodeId);
                    setComments(commentsRes.data);
                    episodeRef.current.scrollIntoView({ behavior: 'smooth', block: "center"});
                } else {
                    setClickedEpisode(null)
                    setCurrentEpisode(null);
                    setComments([]);
                }
            } catch (err) {
                console.error(err.response);
            } finally {
                store.stopLoading();
            }
        }
    }, [episodeId, fansubId]);

    const handleClose = () => {
        setOpen(false);
        setUpdatedComment(undefined);
        setRepliedComment(undefined);
        
    };

    const changeFansub = (fansub) => {
        setCurrentEpisode(null);
        setClickedEpisode(null);
        setChoosenFansub(fansub);
        history.push('/animes/' + animeId + '/episodes' + '?fansub=' + fansub);
    }

    const openCommentDialog = () => {
        setOpen(true);
    }

    const addComment = async (comment, resetForm) => {
        store.startLoading();
        try {
            let res;
            if(repliedComment) {
                res = await api.replyToComment(animeId, episodeId, comment, repliedComment._id);
            } else {
                res = await api.addComment(animeId, episodeId, comment);
            }
            const data = res.data;
            const commentTemp = [...comments];
            commentTemp.push(data)
            setComments(commentTemp);
            handleClose();
            resetForm();
            enqueueSnackbar('התגובה נוספה', {variant: 'success'});
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }

    const removeComment = async (commentId) => {
        store.startLoading();
        try {
            const { data } = await api.removeComment(animeId, episodeId, commentId);
            const updatedComments = comments.filter((comment) => comment._id !== commentId);
            setComments(updatedComments);
            enqueueSnackbar('התגובה הוסרה', {variant: 'warning'});
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }

    const editComment = (comment) => {
        setUpdatedComment(comment);
        setOpen(true);
    }

    const replyToComment = (comment) => {
        setRepliedComment(comment);
        setOpen(true);
    }

    const updateComment = async (updatedComment, resetForm, commentId) => {
        store.startLoading();
        try {
            const { data } = await api.updateComment(animeId, episodeId, commentId, updatedComment);
            const editCommentIndex = comments.findIndex(comment => comment._id === commentId);
            const commentTemp = [...comments];
            commentTemp[editCommentIndex] = data;
            setComments(commentTemp);
            setUpdatedComment(undefined);
            handleClose();
            resetForm();
            enqueueSnackbar('התגובה עודכנה', {variant: 'info'});
        } catch (err) {
            console.error(err.response);
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }

    const showcaseStyle = () => {
        if(anime.image) {
            return {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url('${anime.image}')`
            };
        } else {
            return null;
        }
    }

    return (
        <>
            {(anime) && (
                <>
                    <div className={classes.showcase} style={showcaseStyle()}>
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
                    <Grow in timeout={500}>
                        <Container maxWidth="lg" className={classes.containers}>
                            <AnimeDetails anime={anime} projects={anime.projects} episodes={episodes} choosenFansub={choosenFansub} changeFansub={changeFansub} clickedEpisode={clickedEpisode}/>
                            {currentEpisode && (
                                <>
                                    <div ref={episodeRef}>
                                        <Episode anime={anime} episode={currentEpisode}/>
                                    </div>
                                    <Box display="flex">
                                        <Typography variant="h5" className={classes.commentsTitle}>
                                            {`תגובות (${comments.length})`}
                                        </Typography>
                                        {userStore.user ?
                                            <>
                                                <Button variant="contained" color="primary" onClick={openCommentDialog}>
                                                    הוסף תגובה +
                                                </Button>
                                                <CommentDialog onSumbit={updatedComment ? updateComment : addComment} updatedComment={updatedComment} repliedComment={repliedComment} open={open} handleClose={handleClose} />
                                            </>
                                            :
                                            <Button variant="contained" color="primary" onClick={() => history.push(`/login?redirect=${location.pathname}?fansub=${fansubId}%26episode=${episodeId}`)} >
                                                הוסף תגובה +
                                            </Button>
                                        }
                                    </Box>
                                    <Comments comments={comments} removeComment={removeComment} editComment={editComment} replyToComment={replyToComment} />
                                </>
                            )}
                        </Container>
                    </Grow>
                </>
            )}
        </>
    )
}

export default observer(Anime);
