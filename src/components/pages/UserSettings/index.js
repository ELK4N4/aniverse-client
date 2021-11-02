import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import SettingsIcon from '@material-ui/icons/Settings';
import { Avatar, Box, Button, Container, Grid, Typography } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useStore } from '../../../stores';
import * as api from '../../../api';
import SettingsTabs from './SettingsTabs';
import TabsGroup, { TabContainer } from '../../TabsGroup';
import UserContainer from './UserContainer';
import ProfileContainer from './ProfileContainer';


function UserSettings() {
    const store = useStore();
    const { userStore } = store;
    const history = useHistory();
    const classes = useStyles();

    useEffect(async () => {
        userStore.fetchCurrentUser();
    }, []);
    
    return (
        <>
            <Box className={classes.showcase} justifyContent="center" alignItems="center">
                <Typography variant="h2" align="center" className={classes.title}>
                    הגדרות
                </Typography>
            </Box>
            <TabsGroup >
                <TabContainer label="משתמש" path="user">
                    <UserContainer />
                </TabContainer>
                <TabContainer label="פרופיל" path="profile">
                    <ProfileContainer />
                </TabContainer>
                <TabContainer label="התראות" path="notifications">
                    התראות
                </TabContainer>
            </TabsGroup>
        </>
    )
}

export default observer(UserSettings);