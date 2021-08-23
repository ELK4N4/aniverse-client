import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useStore } from '../../../../stores';
import * as api from '../../../../api';
import Comment from '../../../Comment';

const initComment = {message: ''}

function CommentDialog({onSumbit, open, handleClose, updatedComment = initComment}) {
    const { animeId, episodeId } = useParams();
    const store = useStore();
    const { userStore } = store;
    const classes = useStyles();
    const [comment, setComment] = useState(updatedComment);

    useEffect(() => {
        setComment(updatedComment);
    }, [updatedComment])

    const handleChange = (e) => setComment({ ...comment, [e.target.name]: e.target.value });

    const handleSumbit = () => {
        onSumbit(comment);
        setComment(initComment)
        handleClose();
    };

    return (
        <>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{updatedComment.message.length == 0 ? 'תגובה חדשה' : 'עריכת תגובה' }</DialogTitle>
                <DialogContent>
                    <TextField
                        id="message"
                        label="תגובה"
                        type="message"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        autoFocus
                        value={comment.message}
                        name="message"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    ביטול
                </Button>
                <Button onClick={handleSumbit} variant="contained" color="primary">
                    שלח
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CommentDialog;
