import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import useStyles from './style';
import { useHistory } from 'react-router';

export default function Home() {
    const classes = useStyles();
    const history = useHistory();
    
    const watchClick = () => {
        history.push('/animes');
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="center" className={classes.background}>
            <div color="white">
                <Typography color="primary" variant="h1" align="center" className={classes.title}>
                    ברוכים הבאים
                </Typography>
                <Typography color="primary" variant="h5" align="center" className={classes.subtitle}>
                    קהילת האנימה הישראלית
                </Typography>
                <br />
                <Button onClick={watchClick} fullWidth variant="contained" color="primary" className={classes.watchBtn}>
                    לצפייה
                </Button>
            </div>
        </Box>
    );
}