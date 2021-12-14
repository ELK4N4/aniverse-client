import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';
import { IconButton, Link as MuiLink } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory, useParams, Link } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';

export default function Notification({ text, checked }) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Paper style={{cursor: "pointer", padding: "25px 40px", boxShadow: '0px 0px 10px #a8a8a8', margin: "25px 10px"}}>
            <Typography variant="h5">
                <Box display="flex" justifyItems="center" alignItems="center">
                    <Avatar style={{marginLeft: 30, width: 50, height: 50 }}>
                        <NotificationsIcon />
                    </Avatar>
                    {checked ?
                        text
                    :
                        <strong>
                            {text}
                        </strong>
                    }
                    
                </Box>
            </Typography>
        </Paper>
    );
}