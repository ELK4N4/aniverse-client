import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TheatersIcon from '@material-ui/icons/Theaters';
import useStyles from './style';
import EditIcon from '@material-ui/icons/Edit';
import { Avatar, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../../stores';
import * as api from '../../../../api';
import EditMemberDialog from './EditMemberDialog';
import { Skeleton } from '@material-ui/lab';
import AddMemberDialog from './AddMemberDialog';
import { useSnackbar } from 'notistack';


function ProjectsContainer() {
    const store = useStore();
    const { fansubStore } = store;
    const history = useHistory();
    const classes = useStyles();
    const [editMember, setEditMember] = useState();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);

    const handleClickOpen = (member) => {
        setEditMember(member);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const removeMember = async (userId) => {
        fansubStore.removeMember(userId)
    }

    return (
        <>
            <Container maxWidth="lg">
                <Paper elevation={5} className={classes.paper}>
                    <Typography align="center" component="h1" variant="h5" className={classes.title}>
                        חברי צוות
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
                    {fansubStore.members?.map((member) => (
                        <ListItem button key={member.user._id}>
                            <ListItemAvatar>
                                <Avatar src={member.user.avatar}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={member.user.username}
                            />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="edit" onClick={() => handleClickOpen(member)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => removeMember(member.user._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                    </List>
                }

                    <AddMemberDialog />

                </Paper>

            </Container>

            {editMember &&
                <EditMemberDialog removeMember={removeMember} member={editMember} open={open} handleClose={handleClose}/>
            }
        </>
    )
}

export default observer(ProjectsContainer);