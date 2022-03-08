import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import { Container, Typography } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import { useStore } from '../../../stores';
import Comment from '../../../components/Comment';


function Comments({comments, removeComment, editComment, replyToComment}) {
    const { animeId, episodeId } = useParams();
    const store = useStore();
    const { userStore } = store;
    const classes = useStyles();
    const commentsRef = useRef({});

    return (
        <>
            {comments.map(comment => <Comment commentsRef={commentsRef}  key={comment._id} comment={comment} removeComment={removeComment} editComment={editComment} replyToComment={replyToComment} />)}
        </>
    )
}

export default Comments;
