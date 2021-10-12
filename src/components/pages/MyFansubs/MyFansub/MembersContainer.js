import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import TheatersIcon from '@material-ui/icons/Theaters';
import useStyles from './style';
import EditIcon from '@material-ui/icons/Edit';
import { Avatar, Box, Button, Container, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography, withStyles } from '@material-ui/core';
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
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const classes = useStyles();
    const [editMember, setEditMember] = useState();
    const [open, setOpen] = useState(false);

    const handleClickOpen = (member) => {
        setEditMember(member);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const removeMember = (userId, username) => {
        if (window.confirm("להסיר את " + username + " מהפאנסאב?")) {
            fansubStore.removeMember(userId,
                () => {
                    enqueueSnackbar('חבר צוות הוסר', {variant: 'success'});
                },
                (error) => {
                    enqueueSnackbar(error, {variant: 'error'});
                }
            );
        }
    }

    const StyledItemText = withStyles((theme) => ({
        root: {
            color: 'white',
            '&>*': {
                fontSize: theme.typography.h3.fontSize,
                fontWeight: 'bold',
                textShadow: '0px 0px 20px #000000',
            }
        },
    }))(ListItemText);

    const listItemBannerStyle = (image) => {
        if(image) {
            return {
                backgroundImage: `linear-gradient(to right ,rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url('${image}')`
            };
        } else {
            return null;
        }
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
                        <ListItem button key={member.user._id} className={classes.listItem} style={listItemBannerStyle(member.user.banner)}>
                            <div style={{marginLeft: 10}} />
                            <ListItemAvatar>
                                <Avatar src={member.user.avatar} className={classes.avatar}/>
                            </ListItemAvatar>
                            <div className="text-margin" style={{ marginLeft: 20, transition: '.3s' }} />
                            <StyledItemText
                                primary={member.user.username}
                                style={{
                                    '&>*': {
                                        fontSize: 40
                                    }}
                                }

                            />
                            <ListItemSecondaryAction>
                                <Box className={classes.sideButtons}>
                                    <IconButton color="primary" aria-label="edit" onClick={() => handleClickOpen(member)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="primary" aria-label="delete" onClick={() => removeMember(member.user._id, member.user.username)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton color="primary" aria-label="launch" onClick={() => window.open('/users/' + member.user._id, '_blank', 'noopener,noreferrer')}>
                                        <LaunchIcon />
                                    </IconButton>
                                </Box>
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