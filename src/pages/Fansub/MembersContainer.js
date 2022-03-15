import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TheatersIcon from '@material-ui/icons/Theaters';
import useStyles from './style';
import { Avatar, Box, Button, Container, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../stores';
import { Skeleton } from '@material-ui/lab';
import { toJS } from 'mobx';
import { Slide } from '@material-ui/core';
import AnimeCards from '../../components/Cards/AnimeCards';


function MembersContainer() {
    const store = useStore();
    const { userStore } = store;
    const { fansubStore } = store;
    const history = useHistory();
    const location = useLocation();
    const { fansubId } = useParams();
    const { projectId } = useParams();
    const classes = useStyles();

    const handleClick = (userId) => {
        history.push('/users/' + userId);
    }

    return (
        <>
            <Paper elevation={5} className={classes.paper}>
                <Typography align="center" component="h1" variant="h5" className={classes.title}>
                    חברי צוות
                </Typography>
                <Grid
                        className={classes.root}
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {fansubStore.members.map((member) => (
                            <Grid item xs='auto' key={member.user._id}>
                                <Paper elevation={0} className={classes.memberPaper} onClick={() => handleClick(member.user._id)}>
                                    <Box display="flex" justify="space-between" alignItems="center" style={{height: "100%", flexDirection: "column"}}>
                                        <Avatar
                                            src={member.user.avatar}
                                            className={classes.userAvatar}
                                        />
                                        <div style={{marginTop: 8, flexGrow: 1,}} />
                                        <Typography className={classes.memberText} align="center" variant="h6">
                                            { member.user.username }
                                        </Typography>
                                        <Typography align="center" variant="body1">
                                            { member.role }
                                        </Typography>
                                    </Box>
                                </Paper>
                            {member.userId}
                            </Grid>
                            
                        ))}
                    </Grid >
            </Paper>
        </>
    )
}

export default observer(MembersContainer);