import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TheatersIcon from '@material-ui/icons/Theaters';
import useStyles from './style';
import { Avatar, Box, Button, Container, FormControl, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, MenuItem, Select, Typography } from '@material-ui/core';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../stores';
import { Skeleton } from '@material-ui/lab';
import { toJS } from 'mobx';
import { Slide } from '@material-ui/core';
import AnimeCards from '../../components/Cards/AnimeCards';

const statusTypes = ['הכל', 'פעיל', 'מוקפא', 'הושלם', 'מתוכנן', 'ננטש'];

function ProjectsContainer() {
    const store = useStore();
    const [status, setStatus] = useState('הכל');
    const { userStore } = store;
    const { fansubStore } = store;
    const history = useHistory();
    const location = useLocation();
    const { fansubId } = useParams();
    const { projectId } = useParams();
    const classes = useStyles();

    return (
        <>
            <Paper elevation={5} className={classes.paper}>
                <Box display="flex" justifyContent="center">
                    <Typography align="center" variant="h4" className={classes.title}>
                        פרוייקטים
                    </Typography>
                    <div style={{marginRight: 10}} />
                    <FormControl size="large" variant="outlined">
                        <InputLabel id="select-fansub-label">סטטוס</InputLabel>
                        <Select
                            labelId="choosen-fansub-label"
                            id="choosen-fansub"
                            label="פאנסאב"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                        {statusTypes.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Box>
                <AnimeCards clickable animes={fansubStore.fansubAnimesByStatus(status)} />
            </Paper>
        </>
    )
}

export default observer(ProjectsContainer);