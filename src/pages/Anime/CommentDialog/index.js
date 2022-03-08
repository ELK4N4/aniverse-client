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
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useStore } from '../../../stores';
import { useFormik } from 'formik';
import { commentScheme } from '@aniverse/utils/validations';
import ReplyBox from './ReplyBox';

const initComment = {message: ''}

function CommentDialog({onSumbit, open, handleClose, updatedComment = initComment, repliedComment}) {
    const { animeId, episodeId } = useParams();
    const store = useStore();
    const { userStore } = store;
    const classes = useStyles();
    const [comment, setComment] = useState(updatedComment);

    useEffect(() => {
        setComment(updatedComment);
    }, [updatedComment])

    const handleChange = (e) => setComment({ ...comment, [e.target.name]: e.target.value });

    const handleSubmit = (values) => {
        onSumbit(values, formik.resetForm ,comment._id);
        setComment(initComment)
    };

    const formik = useFormik({ initialValues: comment,
        enableReinitialize: true,
        validateOnBlur: true,
        onSubmit: handleSubmit,
        validationSchema: commentScheme
    })

    return (
        <>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{updatedComment.message.length == 0 ? 'תגובה חדשה' : 'עריכת תגובה' }</DialogTitle>
                <DialogContent>
                    {repliedComment && (
                        <ReplyBox title={"הגב לתגובה"} repliedComment={repliedComment} />
                    )}
                    <TextField
                        error={formik.touched.message && formik.errors.message}
                        helperText={formik.touched.message && formik.errors.message}
                        onBlur={formik.handleBlur}
                        id="message"
                        label="תגובה"
                        type="message"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        autoFocus
                        name="message"
                        onChange={formik.handleChange}
                        value={formik.values.message}
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    ביטול
                </Button>
                <Button onClick={formik.handleSubmit} variant="contained" color="primary">
                    שלח
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CommentDialog;
