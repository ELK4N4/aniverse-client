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
import { useStore } from '../../../../stores';
import * as api from '../../../../api';
import EditMemberDialog from './EditMemberDialog';
import { Skeleton } from '@material-ui/lab';
import AddMemberDialog from './AddMemberDialog';
import { useSnackbar } from 'notistack';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import StyledListItem from '../../../StyledListItem';
import PaperWithHeader, { PaperHeader, PaperHeaderSection, PaperBody } from '../../../PaperWithHeader';


function ProjectsContainer() {
    const store = useStore();
    const { fansubStore } = store;
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
                },
                (error) => {
                    enqueueSnackbar(error, {variant: 'error'});
                }
            );
        }
    }

    const StyledItemText = withStyles((theme) => ({
        root: {
            color: 'white',
            '&>*': {
                fontSize: theme.typography.h3.fontSize,
                fontWeight: 'bold',
                textShadow: '0px 0px 20px #000000',
                [theme.breakpoints.down('xs')]: {
                    fontSize: theme.typography.h5.fontSize,
                },
            }
        },
    }))(ListItemText);

    const listItemBannerStyle = (image) => {
        if(image) {
            return {
                backgroundImage: `linear-gradient(to right ,rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url('${image}')`,
            };
        } else {
            return null;
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
                                    ]}
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

export default observer(ProjectsContainer);