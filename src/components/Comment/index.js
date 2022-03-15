import React, { useEffect, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';
import { IconButton, Link as MuiLink, withStyles } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReplyIcon from '@material-ui/icons/Reply';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import ReplyBox from '../ReplyBox';
import { useStore } from '../../stores';

export default function Comment({ commentsRef, comment, removeComment, editComment, replyToComment }) {
    const classes = useStyles();
    const history = useHistory();
    const store = useStore();
    const { userStore } = store;

    const handleUserClick= () => {
        history.push(`/users/${comment.addedByUser._id}`);
    }

    const CustomMuiLink = withStyles((theme) => ({
        root: {
            color: 'white',
            '&>*': {
                fontSize: theme.typography.h3.fontSize,
                fontWeight: 'bold',
                textShadow: '0px 0px 20px #000000',
                [theme.breakpoints.down('sm')]: {
                    fontSize: theme.typography.h4.fontSize,
                },
                [theme.breakpoints.down('xs')]: {
                    fontSize: theme.typography.h5.fontSize,
                },
            }
        },
        secondary: {
            color: 'white',
            fontSize: theme.typography.body1.fontSize,
            fontWeight: 'normal',
            textShadow: '0px 0px 20px #000000',
            [theme.breakpoints.down('sm')]: {
                fontSize: theme.typography.body1.fontSize,
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: theme.typography.body2.fontSize,
            },
        }
    }))(MuiLink);

    return (
        <Paper ref={el => commentsRef.current[comment._id] = el} className={classes.paper} elevation={5}>
            <Box display="flex" alignItems="center" className={classes.header}>
                <Avatar src={comment.addedByUser?.avatar ?? undefined} className={classes.avatar} onClick={handleUserClick}>{comment.addedByUser.username.toString()[0]}</Avatar>
                <MuiLink className={classes.username}>
                    <Typography variant="h6" className={classes.username} onClick={handleUserClick}>
                            {comment.addedByUser.username}
                    </Typography>
                </MuiLink>
                <Box display="flex" alignItems="center" className={classes.headerControls} >
                    {(userStore.user?.user && comment.addedByUser._id === userStore.user.user._id) && 
                        <>
                            <IconButton aria-label="delete" onClick={() => removeComment(comment._id)}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton aria-label="edit" onClick={() => editComment(comment)}>
                                <EditIcon />
                            </IconButton>
                        </>
                    }
                    <IconButton aria-label="reply" onClick={() => replyToComment(comment)}>
                        <ReplyIcon />
                    </IconButton>
                </Box>
            </Box>
            {comment.replyTo && (
                <ReplyBox repliedComment={comment.replyTo} onClick={() => commentsRef.current[comment.replyTo._id]?.scrollIntoView({ behavior: 'smooth', block: "center"})} />
            )}
            <Typography variant="body1" style={{whiteSpace: "pre-line", wordBreak: "break-word"}}>
                {comment.message}
            </Typography>
        </Paper>
    );
}