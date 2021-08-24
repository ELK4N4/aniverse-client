import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { SnackbarProvider, useSnackbar } from 'notistack';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import MovieIcon from '@material-ui/icons/Movie';
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import useStyles from './style';
import { AppBar, Avatar, Box, Button, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Slide, Toolbar, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../../../stores';
import * as api from '../../../../../api';
import AddEpisodeDialog from './AddEpisodeDialog';
import EditEpisodeDialog from './EditEpisodeDialog';
import { Skeleton } from '@material-ui/lab';


function Project() {
    const store = useStore();
    const { userStore } = store;
    const history = useHistory();
    const { fansubId ,projectId } = useParams();
    const classes = useStyles();
    const [project, setProject] = useState({});
    const [anime, setAnime] = useState({});
    const [open, setOpen] = useState(false);
    const [currentEditedEpisode, setCurrentEditedEpisode] = useState({});
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(async () => {
        store.startLoading();
        try {
            const projectRes = await api.fetchProject(fansubId, projectId);
            const animeRes = await api.fetchAnime(projectRes.data.anime);
            console.log(projectRes.data)
            setProject(projectRes.data);
            setAnime(animeRes.data);
        } catch (err) {
            enqueueSnackbar(err.message, {variant: 'error'});
        } finally {
            setLoading(false);
            store.stopLoading();
        }
    }, []);

    async function updateEpisode(updatedEpisode) {
        try {
            const episodeId = updatedEpisode._id;
            delete updatedEpisode._id;
            const { data } = await api.updateEpisode(fansubId, projectId, episodeId, updatedEpisode);
            const newProject = {...project};
            project.episodes.forEach((episode, index) => {
                if(episode._id === episodeId) {
                    newProject.episodes[index] = data;
                }
            });
            setProject(newProject);
            enqueueSnackbar('הפרק עודכן', {variant: 'success'});
        } catch (err) {
            if (err.response) {
                enqueueSnackbar(err.response.data, {variant: 'error'});
            } else if (err.request) {
                enqueueSnackbar(err.request, {variant: 'error'});
            } else {
                enqueueSnackbar(err.message, {variant: 'error'});
            }
        }
    }

    async function deleteEpisode(episodeId) {
        try {
            const { data } = await api.deleteEpisode(fansubId, projectId, episodeId);
            const projectEpisodes = project.episodes.filter(episode => episode._id !== episodeId);
            const newProject = {...project};
            newProject.episodes = projectEpisodes;
            setProject(newProject);
            enqueueSnackbar('הפרק נמחק', {variant: 'warning'});
        } catch (err) {
            if (err.response) {
                enqueueSnackbar(err.response.data, {variant: 'error'});
            } else if (err.request) {
                enqueueSnackbar(err.request, {variant: 'error'});
            } else {
                enqueueSnackbar(err.message, {variant: 'error'});
            }
        }
    }

    const addEpisode = async (episode) => {
        try {
            const { data } = await api.addEpisode(fansubId, projectId, episode);
            const newProject = {...project};
            newProject.episodes.push(data);
            setProject(newProject);
            enqueueSnackbar('הפרק נוסף', {variant: 'success'});
        } catch (err) {
            if (err.response) {
                enqueueSnackbar(err.response.data, {variant: 'error'});
            } else if (err.request) {
                enqueueSnackbar(err.request, {variant: 'error'});
            } else {
                enqueueSnackbar(err.message, {variant: 'error'});
            }
        }
    }

    const editEpisode = async (episode) => {
        setCurrentEditedEpisode(episode);
        setOpen(true)
    }

    const backToProjectsPage = () => {
        history.push(`/my-fansubs/${fansubId}/`);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Slide direction="down" in>
                <Container maxWidth="lg">
                    <Paper elevation={5} className={classes.paper}>
                        
                        
                        {loading ?
                            <>
                                <Typography variant="h2">
                                    <Skeleton />
                                </Typography>
                                <Typography variant="h2">
                                    <Skeleton />
                                </Typography>
                                <Typography variant="h2">
                                    <Skeleton />
                                </Typography>
                            </>
                            :
                        <List >

                        <Grid container className={classes.root} spacing={5}>
                            <Grid item xs={1}>
                                <IconButton
                                    edge="end"
                                    aria-label="open drawer"
                                    onClick={backToProjectsPage}
                                >
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={10}>
                                <Box  className={classes.title} >
                                    <Typography align="center" variant="h5">
                                        פרקים
                                    </Typography>
                                    <Typography align="center" variant="subtitle2">
                                        {anime?.name?.hebrew}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Divider />


                        {project.episodes?.map((episode) => (
                            <ListItem button key={episode._id}>
                                <ListItemAvatar>
                                    <Avatar className={classes.episodeAvatar}>
                                        {episode.number}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={episode.name}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={() => editEpisode(episode)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteEpisode(episode._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                        </List>
                    }

                        <AddEpisodeDialog onSumbit={addEpisode} />
                        {open && <EditEpisodeDialog open={open} handleClose={handleClose} currentEditedEpisode={currentEditedEpisode} onSumbit={updateEpisode} ></EditEpisodeDialog> }
                    </Paper>
                </Container>
            </ Slide>
        </>
    )
}

export default Project;