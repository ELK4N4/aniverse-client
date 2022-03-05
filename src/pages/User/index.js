import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../../api';
import { useStore } from '../../stores';
import { useSnackbar } from 'notistack';
import useStyles from './style';
import UserDetails from './UserDetails';

export default function User() {
    const classes = useStyles();
    const store = useStore();
    const { userId } = useParams();
    const [user, setUser] = useState();
    const [viewingTracking, setViewingTracking] = useState();
    const [viewedTracking, setViewedTracking] = useState();
    const [plannedTracking, setPlannedTracking] = useState();
    const [thrownTracking, setThrownTracking] = useState();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(async () => {
        store.startLoading();
        try {
            const userRes = await api.fetchUser(userId);
            setUser(userRes.data);
            const viewingTrackingRes = await api.fetchUserAnimeTracking(userId, "בצפייה", 0, 10);
            setViewingTracking(viewingTrackingRes.data);
        } catch (err) {
            enqueueSnackbar(err.message, {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }, [userId]);  

    const showcaseStyle = () => {
        if(user?.banner) {
            return {
                backgroundImage: `url('${user.banner}')`
            };
        } else {
            return null;
        }
    }

    return (
        <>
            <div className={classes.showcase} style={showcaseStyle()} />
            <Container maxWidth="lg" className={classes.container}>
                <UserDetails user={user} viewingTracking={viewingTracking} />
            </Container>
        </>
    );
}