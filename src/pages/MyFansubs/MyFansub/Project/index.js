import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { SnackbarProvider, useSnackbar } from 'notistack';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import MovieIcon from '@material-ui/icons/Movie';
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import useStyles from './style';
import { AppBar, Avatar, Box, Button, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Slide, Toolbar, Typography, withStyles } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../../stores';
import * as api from '../../../../api';
import AddEpisodeDialog from './AddEpisodeDialog';
import EditEpisodeDialog from './EditEpisodeDialog';
import { Skeleton } from '@material-ui/lab';
import errorMessage from '../../../../errorMessage';
import PaperWithHeader, { PaperHeader, PaperHeaderSection, PaperBody } from '../../../../components/PaperWithHeader';
import StyledListItem from '../../../../components/StyledListItem';

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
        store.startLoading();
        try {
            const {_id, ...episodeFields} = updatedEpisode;
            const { data } = await api.updateEpisode(fansubId, projectId, _id, episodeFields);
            const newProject = {...project};
            project.episodes.forEach((episode, index) => {
                if(episode._id === _id) {
                    newProject.episodes[index] = data;
                }
            });
            setProject(newProject);
            enqueueSnackbar('הפרק עודכן', {variant: 'success'});
            handleClose();
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }

    async function deleteEpisode(episodeId, episodeNumber) {
        if (window.confirm("למחוק את פרק " + episodeNumber + "?")) {
            store.startLoading();
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
            } finally {
                store.stopLoading();
            }
        }
    }

    const addEpisode = async (episode, handleClose) => {
        store.startLoading();
        try {
            const { data } = await api.addEpisode(fansubId, projectId, episode);
            const newProject = {...project};
            newProject.episodes.push(data);
            setProject(newProject);
            enqueueSnackbar('הפרק נוסף', {variant: 'success'});
            handleClose();
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }

    const editEpisode = async (episode) => {
        setCurrentEditedEpisode(episode);
        setOpen(true);
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
                    <PaperWithHeader >
                        <PaperHeader divider>
                            <PaperHeaderSection align="right" justify="start">
                                <IconButton
                                        edge="end"
                                        aria-label="open drawer"
                                        onClick={backToProjectsPage}
                                    >
                                        <ArrowForwardIosIcon />
                                </IconButton>
                            </PaperHeaderSection>
                            <PaperHeaderSection align="center" justify="center">
                                <Box>
                                    <Typography align="center" variant="h5">
                                        פרקים
                                    </Typography>
                                    <Typography align="center" variant="subtitle2">
                                        {anime?.name?.hebrew}
                                    </Typography>
                                </Box>
                            </PaperHeaderSection>
                            <PaperHeaderSection align="left" justify="end">
                                <AddEpisodeDialog onSumbit={addEpisode} />
                            </PaperHeaderSection>
                        </PaperHeader>
                        <PaperBody loading={loading}>
                        <List >
                                {project.episodes?.map((episode) => (
                                    <StyledListItem
                                        showAvatarText
                                        showFullText
                                        key={episode._id}
                                        text={episode.name}
                                        avatar={episode.number}
                                        banner={anime.image}
                                        onClick={() => editEpisode(episode)}
                                        controls={[
                                            {
                                                icon: <EditIcon />,
                                                text: 'ערוך',
                                                onClick: () => editEpisode(episode)
                                            },
                                            {
                                                icon: <DeleteIcon />,
                                                text: 'מחק',
                                                onClick: () => deleteEpisode(episode._id, episode.number)
                                            },
                                            {
                                                icon: <LaunchIcon />,
                                                text: 'צפייה',
                                                onClick: () => window.open(`/animes/${anime._id}?fansub=${project.fansub}&episode=${episode._id}`, '_blank', 'noopener,noreferrer')
                                            },
                                        ]}
                                    />
                                ))}
                            </List>
                        </PaperBody>
                    </PaperWithHeader>
                </Container>
            </ Slide>

            {open && <EditEpisodeDialog open={open} handleClose={handleClose} currentEditedEpisode={currentEditedEpisode} onSumbit={updateEpisode} ></EditEpisodeDialog> }
        </>
    )
}

export default Project;