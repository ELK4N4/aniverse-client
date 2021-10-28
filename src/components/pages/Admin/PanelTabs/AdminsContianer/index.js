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
import errorMessage from '../../../../../errorMessage';


function ProjectsContainer() {
    const store = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const classes = useStyles();
    const [admins, setAdmins] = useState([]);
    const [editAdmin, setEditAdmin] = useState();
    const [open, setOpen] = useState(false);

    useEffect(async () => {
        store.startLoading();
        try {
            const { data } = await api.fetchAdmins();
            setAdmins(data);
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    }, []);

    const handleClickOpen = (admin) => {
        setEditAdmin(admin);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const addAdminToArr = async (admin) => {
        setAdmins([...admins, admin]);
    }

    const removeAdmin = async (userId, username) => {
        if (window.confirm("להסיר את " + username + " ?")) {
            store.startLoading();
            try {
                const { data } = await api.deleteAdmin(userId);
                setAdmins(admins.filter((admin) => admin._id !== userId));
                enqueueSnackbar('האדמין הוסר בהצלחה', {variant: 'success'});
            } catch (err) {
                enqueueSnackbar(errorMessage(err), {variant: 'error'});
            } finally {
                store.stopLoading();
            }
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
                    {admins?.map((admin) => (
                        <ListItem button key={admin._id}>
                            <ListItemAvatar>
                                <Avatar src={admin.avatar}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={admin.username}
                            />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="edit" onClick={() => handleClickOpen(admin)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => removeAdmin(admin._id, admin.username)}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton aria-label="launch" onClick={() => window.open('/users/' + admin._id, '_blank', 'noopener,noreferrer')}>
                                    <LaunchIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                    </List>
                }

                    <AddAdminDialog addAdminToArr={addAdminToArr}/>

                </Paper>

            </Container>

            {editAdmin &&
                <EditAdminDialog removeAdmin={removeAdmin} admin={editAdmin} open={open} handleClose={handleClose}/>
            }
        </>
    )
}

export default observer(ProjectsContainer);