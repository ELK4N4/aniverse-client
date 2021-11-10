import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TheatersIcon from '@material-ui/icons/Theaters';
import useStyles from './style';
import { Avatar, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../stores';
import * as api from '../../api';
import { Skeleton } from '@material-ui/lab';
import { toJS } from 'mobx';
import TabsGroup, { TabContainer } from '../../components/TabsGroup';
import AdminsContainer from './AdminsContianer';
import BansContainer from './BansContianer';
import AnimesContainer from './AnimesContainer';

export default function AdminPanel() {
    const store = useStore();
    const { userStore } = store;
    const history = useHistory();
    const classes = useStyles();

    return (
        <>
            <Container maxWidth="lg">
                    <Paper elevation={5} className={classes.panelPaper}>
                        <Typography variant="h3" align="center" className={classes.panelTitle}>
                            אדמין פאנל
                        </Typography>
                        <TabsGroup >
                            <TabContainer label="אדמינים" path="admins">
                                <AdminsContainer />
                            </TabContainer>
                            <TabContainer label="באנים" path="bans">
                                <BansContainer />
                            </TabContainer>
                            <TabContainer label="אנימות" path="animes">
                                <AnimesContainer />
                            </TabContainer>
                        </TabsGroup>
                    </ Paper>
            </Container>

        </>
    )
}