import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';
import { IconButton, Link as MuiLink } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory, useParams, Link } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import { deleteNotification } from '../../api';

export default function Notification({ deleteNotification, onClick, message, link, checked }) {
    const classes = useStyles();
    const history = useHistory();
    
    return (
        <Paper onClick={onClick} style={{cursor: "pointer", padding: "25px 40px", boxShadow: '0px 0px 10px #a8a8a8', margin: "25px 10px"}}>
            <Box display="flex" justifyContent="space-between">
                <Box display="flex" justifyItems="center" alignItems="center">
                    <Avatar style={{marginLeft: 30, width: 50, height: 50 }}>
                        <NotificationsIcon />
                    </Avatar>
                    <Typography variant="h6">
                        {checked ?
                            message
                        :
                            <strong>
                                {message}
                            </strong>
                        }
                    </Typography>
                    
                </Box>
                <IconButton color="primary" edge="end" aria-label="delete" onClick={deleteNotification}>
                    <DeleteIcon fontSize="large"/>
                </IconButton>
            </Box>
        </Paper>
    );
}