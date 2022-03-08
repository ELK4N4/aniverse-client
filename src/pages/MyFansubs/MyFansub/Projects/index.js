import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import AddIcon from '@material-ui/icons/Add';
import TheatersIcon from '@material-ui/icons/Theaters';
import useStyles from './style';
import { Avatar, Box, Button, Container, FormControl, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, MenuItem, Select, Typography, withStyles } from '@material-ui/core';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../../stores';
import * as api from '../../../../api';
import ProjectsDialog from './ProjectsDialog';
import { Skeleton } from '@material-ui/lab';
import { toJS } from 'mobx';
import { Slide } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import PaperWithHeader, { PaperHeader, PaperHeaderSection, PaperBody } from '../../../../components/PaperWithHeader';
import AddIconButton from '../../../../components/AddIconButton';

const statusTypes = ['פעיל', 'מוקפא', 'הושלם', 'מתוכנן', 'ננטש'];

function Projects() {
    const store = useStore();
    const { userStore } = store;
    const { fansubStore } = store;
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const location = useLocation();
    const { fansubId } = useParams();
    const { projectId } = useParams();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    
    function openProjectDialog() {
        setOpen(true);
    }

    function handleDialogClose() {
        setOpen(false);
    }

    async function onStatusChange(projectId, updatedStatus) {
        fansubStore.updateProjectStatus(projectId, updatedStatus,
            () => {
                enqueueSnackbar('הסטטוס שונה בהצלחה', {variant: 'success'});
            },
            (error) => {
                enqueueSnackbar(error, {variant: 'error'});
            }
        )
    }

    async function deleteProject(projectId, projectName) {
        if (window.confirm("למחוק את הפרוייקט " + projectName + "?")) {
            fansubStore.deleteProject(projectId, 
                () => {
                    enqueueSnackbar('הפרוייקט הוסר', {variant: 'success'});
                },
                (error) => {
                    enqueueSnackbar(error, {variant: 'error'});
                }
            )
        }
    }

    const handleOnClick = (project) => {
        if(project.anime.copyright) {
            alert("לא ניתן להוסיף פרקים לאנימה זו מכיוון שמוגנת בזכויות יוצרים");
        } else {
            history.push(`/my-fansubs/${fansubId}/project/${project._id}/`);
        }
    }

    return (
        <>
            <Slide direction="up" in>
                <Container maxWidth="lg">
                    <PaperWithHeader >
                        <PaperHeader divider>
                            <PaperHeaderSection align="center" justify="center">
                                <Typography align="center" variant="h5">
                                    פרוייקטים
                                </Typography>
                            </PaperHeaderSection>
                            <PaperHeaderSection align="left" justify="end">
                                <AddIconButton
                                    aria-label="open drawer"
                                    onClick={openProjectDialog}
                                />
                            </PaperHeaderSection>
                        </PaperHeader>
                        <PaperBody loading={store.loading}>
                            <List >
                            {fansubStore.projects?.map((project) => (
                                <ListItem button key={project._id} onClick={() => handleOnClick(project)}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <TheatersIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={project.anime.name.hebrew}
                                    />
                                    <ListItemSecondaryAction>
                                        <FormControl size="small" variant="outlined">
                                            <InputLabel id="select-fansub-label">סטטוס</InputLabel>
                                            <Select
                                                labelId="choosen-fansub-label"
                                                id="choosen-fansub"
                                                label="פאנסאב"
                                                value={project.status}
                                                onChange={(e) => onStatusChange(project._id, e.target.value)}
                                            >
                                            {statusTypes.map((status) => (
                                                <MenuItem key={status} value={status}>
                                                    {status}
                                                </MenuItem>
                                            ))}
                                            </Select>
                                        </FormControl>
                                        <IconButton aria-label="delete" onClick={() => deleteProject(project._id, project.anime.name.hebrew)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton aria-label="launch" onClick={() => window.open('/animes/' + project.anime._id + '?fansub=' + project.fansub, '_blank', 'noopener,noreferrer')}>
                                            <LaunchIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                            </List>
                        </PaperBody>
                    </PaperWithHeader>
                </Container>
            </ Slide>
            <ProjectsDialog open={open} filteredProjects={fansubStore.projects} handleDialogClose={handleDialogClose}/>

        </>
    )
}

export default observer(Projects);