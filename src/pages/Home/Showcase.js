import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography } from '@material-ui/core';
import useStyles from './style';
import { useHistory } from 'react-router';
import withMaxHeight from '../../hoc/withMaxHeight';
import PaperWithHeader, { PaperBody, PaperHeader, PaperHeaderSection } from '../../components/PaperWithHeader';
import { fetchAnimes, fetchFansubs } from '../../api';
import { useStore } from '../../stores';

function Showcase() {
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
                <img className={classes.arrow} src="https://hutz.telhai.ac.il/wp-content/uploads/scroll-down.gif" alt="this slowpoke moves"  width="150" />
            </div>
        </Box>
    );
}

export default withMaxHeight(Showcase);