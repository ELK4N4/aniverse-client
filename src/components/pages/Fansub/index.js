import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import SearchBar from '../../SearchBar/SearchBar';
import { Avatar, Badge, Box, Button, Container, Grid, Typography, withStyles } from '@material-ui/core';
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
import { toJS } from 'mobx';

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 7,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      transform: 'scale(1.3)'
    },
}))(Badge);

function Fansubs() {
    const { fansubId } = useParams();
    const store = useStore();
    const { userStore, fansubStore } = store;
    const history = useHistory();
    const classes = useStyles();

    useEffect(async () => {
        fansubStore.fetchFansub(fansubId);
    }, [fansubId]);

    const showcaseStyle = () => {
        if(fansubStore.fansub.banner) {
            return {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url('${fansubStore.fansub.banner}')`
            };
        } else {
            return null;
        }
    }

    const tabsBackgroundColor = () => {
        if(fansubStore.fansub.banner) {
            return "black"
        } else {
            return "";
        }
    }
    
    return (
        <>
            <Grid container spacing={0} className={classes.showcase} style={showcaseStyle()} justifycontent="flex-end" alignItems="center">
                <Grid item>
                    {<Avatar src={fansubStore.fansub.image} className={classes.logo}/> }
                </Grid>
                <Grid item>
                    <Typography variant="h2" className={classes.fansubName}>
                        {fansubStore.fansub.name}
                    </Typography>
                    <StyledBadge badgeContent={fansubStore.followers} color="primary" overlap="circular" showZero className={classes.followers}>
                        {userStore.user.user.followingFansubs.find((fansub => fansub === fansubId)) ? 
                            <Button size="large" disableElevation variant="contained" className={classes.followingButton} onClick={() => fansubStore.unfollowFansub()}>
                                בטל מעקב
                            </Button>
                        :
                            <Button size="large" disableElevation variant="contained" color="primary" className={classes.followButton} onClick={() => fansubStore.followFansub()}>
                                עקוב +
                            </Button>
                        }
                    </StyledBadge>
                </Grid>
            </Grid>
            <FansubTabs tabsBackgroundColor={tabsBackgroundColor()}/>
        </>
    )
}

export default observer(Fansubs);