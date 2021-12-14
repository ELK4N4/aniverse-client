import React, { useState, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import { Avatar, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import AddIcon from '@material-ui/icons/Add';
import { useStore } from '../../stores';
import * as api from '../../api';
import StyledListItem from '../../components/StyledListItem';
import PaperWithHeader, { PaperHeader, PaperHeaderSection, PaperBody } from '../../components/PaperWithHeader';
import AddIconButton from '../../components/AddIconButton';

function MyFansubs() {
    const store = useStore();
    const { userStore } = store;
    const history = useHistory();
    const classes = useStyles();
    const [fansubs, setFansubs] = useState([]);

    const comfirmedFansubs = useMemo(() => {
        return fansubs.filter(fansub => fansub.confirmed)
    }, [fansubs]);
    console.log(comfirmedFansubs)

    const uncomfirmedFansubs = useMemo(() => {
        return fansubs.filter(fansub => !fansub.confirmed)
    }, [fansubs]);

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
            <Grid container justifyContent="center" alignItems="flex-start" className={classes.container}>
                <Grid item xs={12} sm={12} md={6} style={{padding: 15}}>
                    <PaperWithHeader >
                        <PaperHeader>
                            <PaperHeaderSection align="center" justify="center">
                                <Typography align="center" variant="h5">
                                    פאנסאבים בתהליך אישור
                                </Typography>
                            </PaperHeaderSection>
                            {uncomfirmedFansubs.length > 0 ?
                                <PaperHeaderSection align="left" justify="end">
                                    <AddIconButton
                                        aria-label="open drawer"
                                        onClick={() => history.push('/fansubs/add')}
                                    />
                                </PaperHeaderSection>
                            :
                                <PaperHeaderSection align="bottom" justify="center">
                                    <AddIconButton
                                        style={{width: 80, height: 80, marginTop: 40}}
                                        aria-label="open drawer"
                                        onClick={() => history.push('/fansubs/add')}
                                    />
                                </PaperHeaderSection>
                            }
                        </PaperHeader>
                        <PaperBody loading={!fansubs}>
                            <List>
                                {uncomfirmedFansubs.map((fansub) => (
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
                                        ]}
                                    />
                                ))}
                            </List>
                        </PaperBody>
                    </PaperWithHeader>
                </Grid>

                <Grid item xs={12} sm={12} md={6} style={{padding: 15}}>
                    <PaperWithHeader >
                        <PaperHeader>
                            <PaperHeaderSection align="center" justify="center">
                                <Typography align="center" variant="h5">
                                    ניהול פאנסאבים
                                </Typography>
                            </PaperHeaderSection>
                        </PaperHeader>
                        <PaperBody loading={!fansubs}>
                            <List>
                                {comfirmedFansubs.map((fansub) => (
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
                        </PaperBody>
                    </PaperWithHeader>
                </Grid>
            </Grid>
        </>
    )
}

export default MyFansubs;