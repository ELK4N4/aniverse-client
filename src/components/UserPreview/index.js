import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';
import { Container, Link as MuiLink } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import { useHistory, useParams, Link } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import { deleteNotification } from '../../api';
import UserDetails from '../../pages/User/UserDetails';

export default function UserPreview({ user }) {
    const classes = useStyles();
    const history = useHistory();

    const showcaseStyle = () => {
        if(user.banner.length > 0) {
            return {
                backgroundImage: `url('${user.banner}')`
            };
        } else {
            return null;
        }
    }

    return (
        <Paper elevation={5} className={classes.paper}>
            <div className={classes.showcase} style={showcaseStyle()} />
            <Container maxWidth="lg" className={classes.container}>
                <UserDetails preview user={user} />
            </Container>
        </Paper>
    );
}