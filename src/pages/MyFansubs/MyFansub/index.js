import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import LaunchIcon from '@material-ui/icons/Launch';
import TheatersIcon from '@material-ui/icons/Theaters';
import useStyles from './style';
import { Avatar, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../stores';
import * as api from '../../../api';
import { Skeleton } from '@material-ui/lab';
import ProjectsContainer from './ProjectsContainer';
import MembersContainer from './MembersContainer';
import SettingsContainer from './SettingsContainer';
import TabsGroup, { TabContainer } from '../../../components/TabsGroup';
import { toJS } from 'mobx';



function MyFansub() {
    const store = useStore();
    const { userStore } = store;
    const { fansubStore } = store;
    const history = useHistory();
    const { fansubId } = useParams();
    const classes = useStyles();

    useEffect(async () => {
        fansubStore.fetchFansub(fansubId);
    }, [fansubId]);

    return (
        <>
            <Container maxWidth="lg">
                    <Paper elevation={5} className={classes.panelPaper}>
                        <Typography variant="h3" align="center" className={classes.panelTitle}>
                            {fansubStore.fansub.name}
                            <IconButton color="primary" style={{backgroundColor: 'white', marginRight: 15}} aria-label="delete" onClick={() => window.open('/fansubs/' + fansubId, '_blank', 'noopener,noreferrer')}>
                                <LaunchIcon />
                            </IconButton>
                            <Typography hidden={fansubStore.fansub.confirmed} variant="h6" align="center" className={classes.panelTitle}>
                                בתהליך אישור
                            </Typography>
                        </Typography>
                        
                        <TabsGroup >
                            {(fansubStore.currentMember?.permissions.includes('projects') && fansubStore.fansub.confirmed) &&
                                <TabContainer label="פרוייקטים" path="projects">
                                    <ProjectsContainer />
                                </TabContainer>
                            }

                            {(fansubStore.currentMember?.permissions.includes('members') && fansubStore.fansub.confirmed) &&
                                <TabContainer label="צוות" path="team">
                                    <MembersContainer />
                                </TabContainer>
                            }

                            {fansubStore.currentMember?.permissions.includes('fansub') &&
                                <TabContainer label="הגדרות" path="settings">
                                    <SettingsContainer />
                                </TabContainer>
                            }
                            
                            
                        </TabsGroup>
                    </ Paper>
            </Container>

        </>
    )
}

export default observer(MyFansub);;