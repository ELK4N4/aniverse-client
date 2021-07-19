import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TheatersIcon from '@material-ui/icons/Theaters';
import useStyles from './style';
import { Avatar, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../../../stores';
import * as api from '../../../../../api';
import AddEpisodeDialog from './AddProjectDialog';
import { Skeleton } from '@material-ui/lab';


function Project() {
    const store = useStore();
    const { userStore } = store;
    const history = useHistory();
    const { fansubId ,projectId } = useParams();
    const classes = useStyles();
    const [project, setProject] = useState({});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        store.startLoading();
        try {
            const { data } = await api.fetchProject(fansubId, projectId);
            console.log(data.episodes)
            setProject(data);
        } catch (err) {
            console.error(err.response);
        } finally {
            setLoading(false);
            store.stopLoading();
        }
    }, []);

    async function deleteEpisode(episodeId) {
        const { data } = await api.deleteProject(fansubId, projectId);
    }

    return (
        <>
            <Container maxWidth="lg">
                    <Paper elevation={5} className={classes.paper}>
                        <Typography variant="h2" align="center">
                            {project.name}
                        </Typography>

                        <Container maxWidth="lg">
                            <Paper elevation={5} className={classes.paper}>
                                <Typography align="center" component="h1" variant="h5" className={classes.title}>
                                    פרקים
                                </Typography>
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
                                {project.episodes?.map((episode) => (
                                    <ListItem button key={episode._id}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <TheatersIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={episode.name}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" onClick={() => deleteEpisode(episode._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                                </List>
                            }

                                <AddEpisodeDialog></AddEpisodeDialog>
                            </Paper>
                        </Container>


                        
                    </ Paper>
            </Container>

        </>
    )
}

export default Project;