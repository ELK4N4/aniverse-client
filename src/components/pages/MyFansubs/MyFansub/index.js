import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TheatersIcon from '@material-ui/icons/Theaters';
import useStyles from './style';
import Tabs from './Tabs';
import { Avatar, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../../stores';
import * as api from '../../../../api';
import ProjectsDialog from './ProjectsDialog';
import { Skeleton } from '@material-ui/lab';


function MyFansub() {
    const store = useStore();
    const { userStore } = store;
    const history = useHistory();
    const { fansubId } = useParams();
    const classes = useStyles();
    const [fansub, setFansub] = useState({});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        store.startLoading();
        try {
            const { data } = await api.fetchFansub(fansubId);
            console.log(data.projects)
            setFansub(data);
        } catch (err) {
            console.error(err.response);
        } finally {
            setLoading(false);
            store.stopLoading();
        }
    }, []);

    function openProjectDialog() {
        setOpen(true);
    }

    function handleDialogClose() {
        setOpen(false);
    }

    async function deleteProject(projectId) {
        const { data } = await api.deleteProject(fansubId, projectId);
        const fansubProjects = fansub.projects.filter(project => project._id !== projectId);
        const newFansub = {...fansub};
        newFansub.projects = fansubProjects;
        setFansub(newFansub);
    }

    function addToProjectsList(project) {
        const newFansub = {...fansub};
        newFansub.projects.push(project);
        setFansub(newFansub);
    }

    const handleOnClick = (projectId) => {
        history.push(`/my-fansubs/${fansubId}/project/${projectId}/`);
    }

    return (
        <>
            <Container maxWidth="lg">
                    <Paper elevation={5} className={classes.paper}>
                        <Typography variant="h2" align="center">
                            {fansub.name}
                        </Typography>

                        <Container maxWidth="lg">
                            <Paper elevation={5} className={classes.paper}>
                                <Typography align="center" component="h1" variant="h5" className={classes.title}>
                                    פרוייקטים
                                </Typography>
                                {loading ?
                                    <>
                                        <Typography variant="h4">
                                            <Skeleton />
                                        </Typography>
                                        <Typography variant="h4">
                                            <Skeleton />
                                        </Typography>
                                        <Typography variant="h4">
                                            <Skeleton />
                                        </Typography>
                                    </>
                                    :
                                <List >
                                {fansub.projects?.map((project) => (
                                    <ListItem button key={project._id} onClick={() => handleOnClick(project._id)}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <TheatersIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={project.anime.name.hebrew}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" onClick={() => deleteProject(project._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                                </List>
                            }

                                <Button variant="outlined" color="primary" onClick={openProjectDialog} disabled={loading}>
                                    הוסף פרוייקטים +
                                </Button>

                            </Paper>
                        </Container>


                        
                    </ Paper>
            </Container>

            {loading ? null :
                <ProjectsDialog open={open} filteredProjects={fansub.projects} addToProjectsList={addToProjectsList} handleDialogClose={handleDialogClose}/>
            }

        </>
    )
}

export default MyFansub;