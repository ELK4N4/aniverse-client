import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import TheatersIcon from '@material-ui/icons/Theaters';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './style';
import EditIcon from '@material-ui/icons/Edit';
import { Avatar, Box, Button, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem, Typography, withStyles } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../stores';
import * as api from '../../../api';
import EditMemberDialog from './EditMemberDialog';
import { Skeleton } from '@material-ui/lab';
import AddMemberDialog from './AddMemberDialog';
import { useSnackbar } from 'notistack';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import StyledListItem from '../../../components/StyledListItem';
import PaperWithHeader, { PaperHeader, PaperHeaderSection, PaperBody } from '../../../components/PaperWithHeader';


function MembersContainer() {
    const store = useStore();
    const { fansubStore } = store;
    const { userStore } = store;
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const classes = useStyles();
    const [editMember, setEditMember] = useState();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const onClickEdit = (member) => {
        return () => handleClickOpen(member);
        
    }

    const onClickDelete = (memberId, username) => {
        return () => removeMember(memberId, username);
    }

    const onClickLaunch = (memberId) => {
        return () => window.open('/users/' + memberId, '_blank', 'noopener,noreferrer')
    }

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (callback) => {
        setAnchorEl(null);
        callback();
    };

    const handleClickOpen = (member) => {
        setEditMember(member);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const removeMember = (userId, username) => {
        if (window.confirm("להסיר את " + username + " מהפאנסאב?")) {
            fansubStore.removeMember(userId,
                () => {
                    enqueueSnackbar('חבר צוות הוסר', {variant: 'success'});
                    handleClose();
                },
                (error) => {
                    enqueueSnackbar(error, {variant: 'error'});
                }
            );
        }
    }

    return (
        <>
            <Container maxWidth="lg">
                <PaperWithHeader >
                    <PaperHeader>
                        <PaperHeaderSection align="center" justify="center">
                            <Typography align="center" variant="h5">
                                חברי צוות
                            </Typography>
                        </PaperHeaderSection>
                        <PaperHeaderSection align="left" justify="end">
                            <AddMemberDialog />
                        </PaperHeaderSection>
                    </PaperHeader>
                    <PaperBody loading={store.loading}>
                        <List >
                            {fansubStore.members?.map((member) => (
                                <StyledListItem
                                    key={member.user._id}
                                    text={member.user.username}
                                    secondaryText={member.role}
                                    avatar={member.user.avatar}
                                    banner={member.user.banner}
                                    onClick={onClickEdit(member)}
                                    controls={[
                                        {
                                            icon: <EditIcon />,
                                            text: 'ערוך',
                                            onClick: onClickEdit(member)
                                        },
                                        {
                                            icon: <DeleteIcon />,
                                            text: 'מחק',
                                            onClick: onClickDelete(member.user._id, member.user.username)
                                        },
                                        {
                                            icon: <LaunchIcon />,
                                            text: 'צפייה',
                                            onClick: onClickLaunch(member.user._id)
                                        },
                                    ].filter(control => (member.user._id !== userStore.user.user._id) || (control.text !== "מחק"))}
                                />
                            ))}
                        </List>
                    </PaperBody>
                </PaperWithHeader>
            </Container>

            {editMember &&
                <EditMemberDialog removeMember={removeMember} member={editMember} open={open} handleClose={handleClose}/>
            }
        </>
    )
}

export default observer(MembersContainer);