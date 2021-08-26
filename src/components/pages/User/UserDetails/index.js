import { Avatar, Box, Chip, Paper, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from './style';
import * as api from '../../../../api';
import { useStore } from '../../../../stores';
import { useSnackbar } from 'notistack';

export default function UserDetails() {
    const classes = useStyles();
    const store = useStore();
    const { userStore } = store;
    const { userId } = useParams();
    const [user, setUser] = useState();
    const { enqueueSnackbar } = useSnackbar();

    useEffect( async () => {
        store.startLoading();
        try {
            const { data } = await api.fetchUser(userId);
            setUser(data);
        } catch (err) {
            enqueueSnackbar(err.message, {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }, [userId])
    
    return (
        <>
            <Paper elevation={5} className={classes.paper}>
                <Box display="flex" alignItems="center" className={classes.userHeader}>
                    <Avatar src={user?.profileImage} className={classes.userImage} />
                    <Box>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h3" className={classes.username} >
                                { user?.username }
                            </Typography>
                            {user?.role && (
                                <Chip color="primary" label={user?.role} className={classes.roleChip}/>
                            )}
                        </Box>
                        <Typography variant="h6" color="">
                            { user?._id }
                        </Typography>
                        </Box>
                    </Box>
            </Paper>
        </>
    );
}