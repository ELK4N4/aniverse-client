import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';
import { IconButton, Link as MuiLink } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';

export default function Comment({ comment, removeComment, editComment }) {
    const classes = useStyles();
    const history = useHistory();

    const handleUserClick= () => {
        history.push(`/users/${comment.addedByUser._id}`);
    }

    return (
        <Paper className={classes.paper} elevation={5}>
            <Box display="flex" alignItems="center" className={classes.header}>
                <Avatar src={comment.addedByUser?.profileImage ?? undefined} className={classes.avatar} onClick={handleUserClick}>{comment.addedByUser.username.toString()[0]}</Avatar>
                <Typography variant="h6" style={{cursor: "pointer"}} onClick={handleUserClick}>
                    <MuiLink>
                        {comment.addedByUser.username}
                    </MuiLink>
                </Typography>
                <Box display="flex" alignItems="center" className={classes.headerControls} >
                    <IconButton aria-label="delete" onClick={() => editComment(comment)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => removeComment(comment._id)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>
            <Typography variant="body1">
                {comment.message}
            </Typography>
        </Paper>
    );
}