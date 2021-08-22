import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './style';
import { useHistory, useParams } from 'react-router-dom';
import { Paper } from '@material-ui/core';

export default function Comment({ comment }) {
    const classes = useStyles();
    const history = useHistory();
    const { animeId } = useParams();

    return (
        <Paper className={classes.paper} elevation={20}>
            תגובה
        </Paper>
    );
}