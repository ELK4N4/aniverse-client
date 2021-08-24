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
    const [comments, setComments] = useState([]);
    const [updatedComment, setUpdatedComment] = useState();
    const [open, setOpen] = useState(false);
    const isMount = useIsMount();
    

    useEffect(async () => {
        if(isMount) {
            store.startLoading();
            try {
                const { data } = await api.fetchAnime(animeId);
                setAnime(data);
                const episodes = await api.fetchEpisodes(animeId);
                setEpisodes(episodes.data);
                const currentEpisode = episodes.data.find(episode => episode._id === episodeId);
                if(currentEpisode) {
                    setActiveEpisode(currentEpisode)
                    try {
                        const { data } = await api.fetchComments(animeId, episodeId);
                        setComments(data);
                    } catch (err) {
                        console.error(err.response);
                    } finally {
                        store.stopLoading();
                    }
                }
            } catch (err) {
                console.error(err.response);
            } finally {
                store.stopLoading();
            }
        } else if(episodeId) {
            setActiveEpisode(episodes.find(episode => episode._id === episodeId))
            try {
                const { data } = await api.fetchComments(animeId, episodeId);
                setComments(data);
            } catch (err) {
                console.error(err.response);
            } finally {
                store.stopLoading();
            }
        }
    }, [episodeId]);

    const handleClose = () => {
        setOpen(false);
    };

    const openCommentDialog = () => {
        setOpen(true);
        setUpdatedComment(undefined);
    }

    const addComment = async (comment) => {
        try {
            const { data } = await api.addComment(animeId, episodeId, comment);
            const commentTemp = [...comments];
            commentTemp.push(data)
            console.log('data', data)
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
                        <AnimeDetails anime={anime} episodes={episodes} activeEpisode={activeEpisode}/>
                        {activeEpisode && (
                            <>
                                <Episode anime={anime} episode={activeEpisode}/>
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
