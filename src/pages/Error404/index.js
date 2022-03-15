import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import useStyles from './style';
import { useHistory } from 'react-router';
import withMaxHeight from '../../hoc/withMaxHeight';

function Error404() {
    const classes = useStyles();
    const history = useHistory();
    
    const homePageClick = () => {
        history.push('/');
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="center" className={classes.background}>
            <div color="white">
                <Typography color="primary" variant="h1" align="center" className={classes.title}>
                    404
                </Typography>
                <Typography color="primary" variant="h5" align="center" className={classes.subtitle}>
                    הדף המבוקש לא נמצא
                </Typography>
                <br />
                <Button onClick={homePageClick} fullWidth variant="contained" color="primary" className={classes.watchBtn}>
                    לעמוד הבית
                </Button>
            </div>
        </Box>
    );
}

export default withMaxHeight(Error404);