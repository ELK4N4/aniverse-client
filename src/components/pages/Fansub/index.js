import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import SearchBar from '../../SearchBar/SearchBar';
import { Avatar, Box, Button, Container, Grid, Typography } from '@material-ui/core';
import FansubCards from '../../Cards/FansubCards';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useStore } from '../../../stores';
import * as api from '../../../api';
import FansubTabs from './FansubTabs';


function Fansubs() {
    const { fansubId } = useParams();
    const store = useStore();
    const { fansubStore } = store;
    const { userStore } = store;
    const history = useHistory();
    const classes = useStyles();

    useEffect(async () => {
        fansubStore.fetchFansub(fansubId);
    }, [fansubId]);
    
    return (
        <>
            <Grid container spacing={0} className={classes.showcase} justifyContent="flex-end" alignItems="center">
                <Grid item>
                    {<Avatar src={fansubStore.fansub.image} className={classes.logo}/> }
                </Grid>
                <Grid item>
                    <Typography variant="h2" className={classes.fansubName}>
                        {fansubStore.fansub.name}
                    </Typography>
                    <Typography variant="h6" className={classes.fansubName}>
                        {fansubStore.followers}
                    </Typography>
                    {/* {userStore.user.user.followingFansubs.find(fansubId) ? 
                        <Button size="large" disableElevation disabled variant="contained" color="primary" className={classes.followButton}>
                            אתה עוקב כבר
                        </Button>
                    :
                        <Button size="large" disableElevation variant="contained" color="primary" className={classes.followButton} onClick={() => fansubStore.followFansub()}>
                            עקוב +
                        </Button>
                    } */}

                    <Button size="large" disableElevation variant="contained" color="primary" className={classes.followButton} onClick={() => fansubStore.followFansub()}>
                        עקוב +
                    </Button>
                </Grid>
            </Grid>
            <FansubTabs />
        </>
    )
}

export default Fansubs;