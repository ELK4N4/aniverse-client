import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import useStyles from './style';
import { Avatar, Box, Button, Container, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../stores';

function ProfileContainer() {
    const store = useStore();
    const { userStore } = store;
    const { fansubStore } = store;
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    const handleClick = (userId) => {
        history.push('/users/' + userId);
    }

    return (
        <>
            <Paper elevation={5} className={classes.paper}>
                <Typography align="center" variant="h5" className={classes.containerTitle}>
                    פרופיל
                </Typography>
                <Grid
                        className={classes.root}
                        container
                        spacing={8}
                        direction="row"
                        // justify="center"
                        alignItems="center"
                        //align="center"
                        justify="flex-start"
                    >
                        {fansubStore.members.map((member) => (
                            <Grid item xs='auto' key={member.user._id}>
                                <Paper elevation={0} className={classes.memberPaper} onClick={() => handleClick(member.user._id)}>
                                    <Box display="flex" alignItems="center">
                                        <Avatar
                                            src={member.user.profileImage}
                                            className={classes.userAvatar}
                                        />
                                        <div style={{marginRight: 30}}>
                                            <Typography gutterBottom variant="h5">
                                                { member.user.username }
                                            </Typography>
                                            <Typography gutterBottom variant="body1">
                                                { member.role }
                                            </Typography>
                                        </div>
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

export default observer(ProfileContainer);