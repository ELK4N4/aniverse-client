import React, { useEffect, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';
import { IconButton, Link as MuiLink } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReplyIcon from '@material-ui/icons/Reply';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import ReplyBox from '../ReplyBox';

export default function Comment({ commentsRef, comment, removeComment, editComment, replyToComment }) {
    const classes = useStyles();
    const history = useHistory();
    const commentRef = useRef(null);

    const handleUserClick= () => {
        history.push(`/users/${comment.addedByUser._id}`);
    }

    return (
        <Paper ref={el => commentsRef.current[comment._id] = el} className={classes.paper} elevation={5}>
            <Box display="flex" alignItems="center" className={classes.header}>
                <Avatar src={comment.addedByUser?.avatar ?? undefined} className={classes.avatar} onClick={handleUserClick}>{comment.addedByUser.username.toString()[0]}</Avatar>
                <Typography variant="h6" style={{cursor: "pointer"}} onClick={handleUserClick}>
                    <MuiLink>
                        {comment.addedByUser.username}
                    </MuiLink>
                </Typography>
                <Box display="flex" alignItems="center" className={classes.headerControls} >
                    <IconButton aria-label="delete" onClick={() => removeComment(comment._id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => editComment(comment)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="reply" onClick={() => replyToComment(comment)}>
                        <ReplyIcon />
                    </IconButton>
                </Box>
            </Box>
            {comment.replyTo && (
                <ReplyBox repliedComment={comment.replyTo} onClick={() => commentsRef.current[comment.replyTo._id]?.scrollIntoView({ behavior: 'smooth', block: "center"})} />
            )}
            <Typography variant="body1" style={{whiteSpace: "pre-line"}}>
                {comment.message}
            </Typography>
        </Paper>
    );
}