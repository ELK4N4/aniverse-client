import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import TheatersIcon from '@material-ui/icons/Theaters';
import useStyles from '../../style';
import EditIcon from '@material-ui/icons/Edit';
import { Avatar, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../../../stores';
import * as api from '../../../../../api';
import EditAdminDialog from './EditAdminDialog';
import { Skeleton } from '@material-ui/lab';
import AddAdminDialog from './AddAdminDialog';
import { useSnackbar } from 'notistack';


function ProjectsContainer() {
    const store = useStore();
    const { fansubStore } = store;
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const classes = useStyles();
    const [editAdmin, setEditAdmin] = useState();
    const [open, setOpen] = useState(false);

    const handleClickOpen = (admin) => {
        setEditAdmin(admin);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const removeAdmin = (userId, username) => {
        if (window.confirm("להסיר את " + username + " מהפאנסאב?")) {
            fansubStore.removeAdmin(userId,
                () => {
                    enqueueSnackbar('חבר צוות הוסר', {variant: 'success'});
                },
                (error) => {
                    enqueueSnackbar(error, {variant: 'error'});
                }
            );
        }
    }

    return (
        <>
            <Container maxWidth="lg">
                <Paper elevation={5} className={classes.paper}>
                    <Typography align="center" component="h1" variant="h5" className={classes.title}>
                        אדמינים
                    </Typography>
                    {store.loading ?
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
                    {fansubStore.members?.map((admin) => (
                        <ListItem button key={admin.user._id}>
                            <ListItemAvatar>
                                <Avatar src={admin.user.avatar}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={admin.user.username}
                            />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="edit" onClick={() => handleClickOpen(admin)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => removeAdmin(admin.user._id, admin.user.username)}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton aria-label="launch" onClick={() => window.open('/users/' + admin.user._id, '_blank', 'noopener,noreferrer')}>
                                    <LaunchIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                    </List>
                }

                    <AddAdminDialog />

                </Paper>

            </Container>

            {editAdmin &&
                <EditAdminDialog removeAdmin={removeAdmin} admin={editAdmin} open={open} handleClose={handleClose}/>
            }
        </>
    )
}

export default observer(ProjectsContainer);