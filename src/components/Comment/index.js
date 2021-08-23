import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';
import { Link as MuiLink } from '@material-ui/core/';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';

export default function Comment({ comment }) {
    const classes = useStyles();
    const history = useHistory();
    const { animeId } = useParams();
    const user = {
        username: "שם משתמש",
        _id: 1234
    };

    const handleUserClick= () => {
        history.push(`/users/${user._id}`);
    }

    return (
        <Paper className={classes.paper} elevation={5}>
            <Box display="flex" alignItems="center" className={classes.header}>
                <Avatar className={classes.avatar} onClick={handleUserClick}>{user.username[0]}</Avatar>
                <Typography variant="h6" style={{cursor: "pointer"}} onClick={handleUserClick}>
                    <MuiLink>
                        {user.username}
                    </MuiLink>
                </Typography>
            </Box>
            <Typography variant="body">
                Anim magna sit id ut anim eiusmod cillum id proident dolore minim reprehenderit quis irure. Aliqua laboris aute fugiat fugiat et aliqua fugiat occaecat voluptate sunt laborum officia in reprehenderit. Irure consectetur culpa eiusmod et proident sint ea exercitation ipsum amet cillum magna quis nostrud. Ea ea laboris consequat Lorem aute ut aliquip veniam occaecat. Id officia fugiat minim sint excepteur deserunt laborum ullamco tempor nisi non pariatur culpa. Occaecat adipisicing tempor id sit laborum ut ut irure minim consequat exercitation voluptate qui. Amet cillum proident eiusmod elit dolor ex consequat.
            </Typography>
        </Paper>
    );
}