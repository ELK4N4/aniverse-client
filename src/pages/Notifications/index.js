import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Box, CircularProgress, Container, Typography } from '@material-ui/core';
import AnimeCards from '../../components/Cards/AnimeCards';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useHistory } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useStore } from '../../stores';
import * as api from '../../api';
import InfiniteScroll from 'react-infinite-scroll-component';
import BounceLoader from "react-spinners/BounceLoader";
import Notification from '../../components/Notification';

function Notifications() {
    const store = useStore();
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [notifications, setNotifications] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const limit = 7;
    const skipStart = 0;
    const [skip, setSkip] = useState(skipStart);

    useEffect( async () => {
        window.scrollTo(0, 0);
        store.startLoading();
        try {
            const { data } = await api.fetchNotifications(skipStart, limit);
            if(data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                setSkip(skipStart + limit);
            }
            setNotifications(data);
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    }, [])

    const fetchMoreData = async () => {
        store.startLoading();
        try {
            const { data } = await api.fetchNotifications(skip, limit);
            if(data.length === 0) {
                setHasMore(false);
            } else {
                setNotifications([...notifications, ...data]);
                setSkip(skip + limit);
            }
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    }

    const onNotificationClick = async (notification, index) => {
        window.open(notification.link, "_blank");
        if(!notification.check) {
            try {
                const { data } = await api.checkNotification(notification._id);
                const newNotifications = [...notifications];
                newNotifications[index] = data;
                setNotifications(newNotifications);
            } catch (err) {
                console.error(err.response);
            }
        }
    }

    const deleteNotification = async (e, notificationId) => {
        e.stopPropagation();
        store.startLoading();
        try {
            const { data } = await api.deleteNotification(notificationId);
            setNotifications(notifications.filter((notification) => notification._id !== notificationId));
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    }

    return (
        <>
            <div className={classes.showcase} >
                <Container maxWidth="lg" >
                    <Typography variant="h1" align="center" className={classes.pageTitle}>
                        התראות
                    </Typography>
                </Container>
            </div>
            <Container maxWidth="lg">
                <InfiniteScroll
                    dataLength={notifications.length} //This is important field to render the next data
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={
                        <p style={{ textAlign: 'center' }}>
                            <b></b>
                        </p>
                    }
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b></b>
                        </p>
                    }
                >
                    {notifications.map((notification, index) => (
                        <Notification deleteNotification={(e) => deleteNotification(e, notification._id)} onClick={() => onNotificationClick(notification, index)} message={notification.message} link={notification.link} checked={notification.checked} />
                    ))}
                </InfiniteScroll>
            </Container>
        </>
    )
}

export default Notifications;
