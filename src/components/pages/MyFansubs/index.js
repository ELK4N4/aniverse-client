import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import SearchBar from '../../SearchBar/SearchBar';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import { Avatar, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import FansubCards from '../../Cards/FansubCards';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import AddIcon from '@material-ui/icons/Add';
import { useStore } from '../../../stores';
import * as api from '../../../api';
import StyledListItem from '../../StyledListItem';


function MyFansubs() {
    const store = useStore();
    const { userStore } = store;
    const history = useHistory();
    const classes = useStyles();
    const [fansubs, setFansubs] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(async () => {
        store.startLoading();
        try {
            const { data } = await api.fetchMyFansubs();
            console.log(data);
            setFansubs(data);
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    }, [])

    const goToFansub = (fansubId) => {
        history.push(`/my-fansubs/${fansubId}`);
    }

    const deleteFansub = async (fansubId, fansubName) => {
        if (window.confirm("למחוק את הפאנסאב " + fansubName + "?")) {
            store.startLoading();
            try {
                await api.deleteFansub(fansubId)
                setFansubs(fansubs.filter((fansub) => fansub._id !== fansubId));
            } catch (err) {
                console.error(err.response);
            } finally {
                store.stopLoading();
            }
        }
    }
    

    return (
        <>
            <Container maxWidth="lg">
                <Paper elevation={5} className={classes.paper}>
                    <Typography align="center" variant="h4" className={classes.title}>
                        ניהול פאנסאבים
                    </Typography>
                    <List>
                        {fansubs.map((fansub) => (
                            <StyledListItem
                                key={fansub._id}
                                text={fansub.name}
                                avatar={fansub.avatar}
                                banner={fansub.banner}
                                onClick={() => goToFansub(fansub._id)}
                                controls={[
                                    {
                                        icon: <DeleteIcon />,
                                        text: 'מחק',
                                        onClick: () => deleteFansub(fansub._id, fansub.name)
                                    },
                                    {
                                        icon: <LaunchIcon />,
                                        text: 'צפייה',
                                        onClick: () => window.open('/fansubs/' + fansub._id, '_blank', 'noopener,noreferrer')
                                    },
                                ]}
                            />
                        ))}
                    </List>
                </Paper>
            </Container>

            <Link to='/fansubs/add'>
                <Fab size="large" color="primary" aria-label="add" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Link>
        </>
    )
}

export default MyFansubs;