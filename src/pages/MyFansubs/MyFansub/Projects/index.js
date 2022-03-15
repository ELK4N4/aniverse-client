import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import AddIcon from '@material-ui/icons/Add';
import AlarmAddIcon from '@material-ui/icons/AlarmAdd';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import Menu from '@material-ui/core/Menu';
import AlarmIcon from '@material-ui/icons/Alarm';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import SnoozeIcon from '@material-ui/icons/Snooze';
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
import StyledListItem from '../../../../components/StyledListItem';

const statusTypes = [
    {
        text: 'פעיל',
        icon: <AlarmIcon />
    },
    {
        text: 'מוקפא',
        icon: <SnoozeIcon />    
    },
    {
        text: 'הושלם',
        icon: <AlarmOnIcon />    
    },
    {
        text: 'מתוכנן',
        icon: <AlarmAddIcon />    
    },
    {
        text: 'ננטש',
        icon: <AlarmOffIcon />    
    }
];

function Projects() {
    const store = useStore();
    const { userStore } = store;
    const { fansubStore } = store;
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const location = useLocation();
    const { fansubId } = useParams();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState();
    const [statusMoreAnchorEl, setStatusMoreAnchorEl] = useState(null);
    const isStatusMenuOpen = Boolean(statusMoreAnchorEl);

    function openProjectDialog() {
        setOpen(true);
    }

    function handleDialogClose() {
        setOpen(false);
    }

    const handleStatusMenuOpen = (e, project) => {
        setProject(project);
        setStatusMoreAnchorEl(e.currentTarget);
    };

    const handleStatusMenuClose = () => {
        setStatusMoreAnchorEl(null);
    };

    const getMenuItemStyle = (status) => {
        if(project?.status && status?.text) {
            if(project.status === status.text) {
                return {background: '#e3e3e3', fontWeight: 'bold'};
            } else {
                return {};
            }
        } else {
            return {};
        }
    }

    const getCurrentStatusIcon = (project) => {
        const status = statusTypes.find(status => status.text === project.status);
        return status.icon;
    }

    const renderStatusMenu = (
        <Menu
          anchorEl={statusMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isStatusMenuOpen}
          onClose={handleStatusMenuClose}
        >
            <div>
                {statusTypes.map(status => 
                    <MenuItem style={getMenuItemStyle(status)} onClick={() => onStatusChange(status.text)}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            {status.icon}
                        </IconButton>
                        <p>{status.text}</p>
                    </MenuItem>
                )}
            </div>
        </Menu>
      );

    async function onStatusChange(updatedStatus) {
        fansubStore.updateProjectStatus(project._id, updatedStatus,
            () => {
                enqueueSnackbar('הסטטוס שונה בהצלחה', {variant: 'success'});
            },
            (error) => {
                enqueueSnackbar(error, {variant: 'error'});
            }
        )
        handleStatusMenuClose();
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
                                    <StyledListItem
                                        key={project._id}
                                        text={project.anime.name.hebrew}
                                        secondaryText={project.status}
                                        avatar={project.anime.avatar}
                                        banner={project.anime.banner}
                                        onClick={() => handleOnClick(project)}
                                        controls={[
                                            {
                                                icon: getCurrentStatusIcon(project),
                                                text: 'סטטוס',
                                                onClick: (e) => handleStatusMenuOpen(e, project)
                                            },
                                            {
                                                icon: <DeleteIcon />,
                                                text: 'מחק',
                                                onClick: () => deleteProject(project._id, project.anime.name.hebrew)
                                            },
                                            {
                                                icon: <LaunchIcon />,
                                                text: 'צפייה',
                                                onClick: () => window.open('/animes/' + project.anime._id + '?fansub=' + project.fansub, '_blank', 'noopener,noreferrer')
                                            },
                                        ]}
                                    />
                                ))}
                            </List>
                        </PaperBody>
                    </PaperWithHeader>
                </Container>
            </ Slide>
            <ProjectsDialog open={open} filteredProjects={fansubStore.projects} handleDialogClose={handleDialogClose}/>
            {renderStatusMenu}
        </>
    )
}

export default observer(Projects);