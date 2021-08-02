import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import Projects from './Projects';
import Project from './Project';
import DeleteIcon from '@material-ui/icons/Delete';
import TheatersIcon from '@material-ui/icons/Theaters';
import useStyles from './style';
import PanelTabs from './PanelTabs';
import { Grow, Slide } from '@material-ui/core';
import { Avatar, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../../stores';
import * as api from '../../../../api';
import { Skeleton } from '@material-ui/lab';
import { toJS } from 'mobx';


function ProjectsContainer() {
    const store = useStore();
    const { userStore } = store;
    const { fansubStore } = store;
    const history = useHistory();
    const location = useLocation();
    const { fansubId } = useParams();
    const { projectId } = useParams();
    const classes = useStyles();
    const [isEpisodesPage, setIsEpisodesPage] = useState(location.pathname  === `/my-fansubs/${fansubId}/project/${projectId}/`);
    
    useEffect(() => {
        setIsEpisodesPage(location.pathname  === `/my-fansubs/${fansubId}/project/${projectId}/`)
    }, [location.pathname])

    return (
        <>
                {isEpisodesPage ?
                    <Project />
                :
                    <Projects />
                }
        </>
    )
}

export default observer(ProjectsContainer);