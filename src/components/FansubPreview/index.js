import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';
import { IconButton, Link as MuiLink } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import { useHistory, useParams, Link } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import { deleteNotification } from '../../api';

export default function FansubPreview({ name, avatar, banner, website, description }) {
    const classes = useStyles();
    const history = useHistory();
    
    const showcaseStyle = () => {
        if(banner) {
            return {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url('${banner}')`
            };
        } else {
            return null;
        }
    }

    return (
        <Paper elevation={10} className={classes.showcase} style={showcaseStyle()}>
            <Grid container justifycontent="flex-end" alignItems="center">
                <Grid item>
                    <Avatar src={avatar} className={classes.logo}/>
                </Grid>
                <Grid item>
                    <Typography variant="h2" className={classes.fansubName}>
                        {name}
                    </Typography>
                    <MuiLink hidden={website?.length === 0} href={website} target="_blank" style={{margin: 0}}>
                        <Box display="inline-flex" justifyContent="center">
                            <LaunchIcon fontSize="small" style={{marginRight: 0, marginLeft: 6}} /> {website}
                        </Box>
                    </MuiLink>
                    <Typography variant="body2" style={{whiteSpace: "pre-line"}} className={classes.fansubName}>
                        {description}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}