import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import TheatersIcon from '@material-ui/icons/Theaters';
import useStyles from '../style';
import EditIcon from '@material-ui/icons/Edit';
import { Avatar, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../../stores';
import * as api from '../../../../api';
import EditBanDialog from './EditBanDialog';
import { Skeleton } from '@material-ui/lab';
import AddBanDialog from './AddBanDialog';
import { useSnackbar } from 'notistack';
import errorMessage from '../../../../errorMessage';
import PaperWithHeader, { PaperHeader, PaperHeaderSection, PaperBody } from '../../../PaperWithHeader';
import StyledListItem from '../../../StyledListItem';


function BansContainer() {
    const store = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const classes = useStyles();
    const [bans, setBans] = useState([]);
    const [editBan, setEditBan] = useState();
    const [open, setOpen] = useState(false);

    useEffect(async () => {
        store.startLoading();
        try {
            const { data } = await api.fetchBans();
            setBans(data);
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    }, []);

    const handleClickOpen = (ban) => {
        setEditBan(ban);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const addBanToArr = async (ban) => {
        setBans([...bans, ban]);
    }

    const removeBan = async (banId, username) => {
        if (window.confirm("להסיר את הבאן של " + username + " ?")) {
            store.startLoading();
            try {
                const { data } = await api.deleteBan(banId);
                setBans(bans.filter((ban) => ban._id !== banId));
                enqueueSnackbar('באן הוסר בהצלחה', {variant: 'success'});
            } catch (err) {
                enqueueSnackbar(errorMessage(err), {variant: 'error'});
            } finally {
                store.stopLoading();
            }
        }
    }

    return (
        <>
            <Container maxWidth="lg">
                <PaperWithHeader>
                    <PaperHeader divider>
                        <PaperHeaderSection align="center" justify="center">
                            <Typography align="center"variant="h5">
                                באנים
                            </Typography>
                        </PaperHeaderSection>
                        <PaperHeaderSection align="left" justify="end">
                            <AddBanDialog addBanToArr={addBanToArr}/>
                        </PaperHeaderSection>
                    </PaperHeader>
                    <PaperBody loading={!bans}>
                        <List >
                            {bans?.map((ban) => (
                                <StyledListItem
                                    key={ban.user._id}
                                    text={ban.user.username}
                                    avatar={ban.user.avatar}
                                    banner={ban.user.banner}
                                    onClick={() => handleClickOpen(ban)}
                                    controls={[
                                        {
                                            icon: <EditIcon />,
                                            text: 'ערוך',
                                            onClick: () => handleClickOpen(ban)
                                        },
                                        {
                                            icon: <DeleteIcon />,
                                            text: 'מחק',
                                            onClick: () => removeBan(ban._id, ban.user.username)
                                        },
                                        {
                                            icon: <LaunchIcon />,
                                            text: 'צפייה',
                                            onClick: () => window.open('/users/' + ban.user._id, '_blank', 'noopener,noreferrer')
                                        },
                                    ]}
                                />
                            ))}
                        </List>
                    </PaperBody>
                </PaperWithHeader>
            </Container>

            {editBan &&
                <EditBanDialog removeBan={removeBan} ban={editBan} open={open} handleClose={handleClose}/>
            }
        </>
    )
}

export default BansContainer;