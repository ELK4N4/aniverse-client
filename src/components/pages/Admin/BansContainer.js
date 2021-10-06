import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import TheatersIcon from '@material-ui/icons/Theaters';
import useStyles from './style';
import EditIcon from '@material-ui/icons/Edit';
import { Avatar, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../stores';
import * as api from '../../../api';
import EditBanDialog from './EditBanDialog';
import { Skeleton } from '@material-ui/lab';
import AddBanDialog from './AddBanDialog';
import { useSnackbar } from 'notistack';


export default function BansContainer() {
    const store = useStore();
    const { fansubStore } = store;
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const classes = useStyles();
    const [editBan, setEditBan] = useState();
    const [open, setOpen] = useState(false);

    const handleClickOpen = (ban) => {
        setEditBan(ban);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const removeBan = (userId, username) => {
        if (window.confirm("להסיר את " + username + " מהפאנסאב?")) {
            fansubStore.removeBan(userId,
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
                        באנים
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
                    {fansubStore.members?.map((ban) => (
                        <ListItem button key={ban.user._id}>
                            <ListItemAvatar>
                                <Avatar src={ban.user.avatar}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={ban.user.username}
                            />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="edit" onClick={() => handleClickOpen(ban)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => removeBan(ban.user._id, ban.user.username)}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton aria-label="launch" onClick={() => window.open('/users/' + ban.user._id, '_blank', 'noopener,noreferrer')}>
                                    <LaunchIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                    </List>
                }

                    <AddBanDialog />
                </Paper>

            </Container>

            {editBan &&
                <EditBanDialog removeBan={removeBan} ban={editBan} open={open} handleClose={handleClose}/>
            }
        </>
    )
}