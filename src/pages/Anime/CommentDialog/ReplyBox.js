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

function ReplyBox({title, repliedComment, onClick}) {
    const store = useStore();
    const { userStore } = store;
    const classes = useStyles();

    return (
        <Paper onClick={onClick} elevation={0} className={classes.replyPaper} style={onClick ? {cursor: "pointer"} : {}}>
            {title && 
                <>
                    <Typography variant="body1">
                        {title}
                    </Typography>
                    <hr/>
                </>
            }
            <Typography variant="body1" style={{fontWeight: "bold"}}>
                {repliedComment.addedByUser.username}
            </Typography>
            <Typography variant="body2">
                {repliedComment.message || "הודעה זו נמחקה"}
            </Typography>
        </Paper>
    )
}

export default ReplyBox;
