import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import TheatersIcon from '@material-ui/icons/Theaters';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './style';
import EditIcon from '@material-ui/icons/Edit';
import { Avatar, Box, Button, Container, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem, Typography, withStyles } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../../stores';
import * as api from '../../../../api';
import EditMemberDialog from './EditMemberDialog';
import { Skeleton } from '@material-ui/lab';
import AddMemberDialog from './AddMemberDialog';
import { useSnackbar } from 'notistack';


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
                <Paper elevation={5} className={classes.paper}>
                    <Typography align="center" component="h1" variant="h5" className={classes.title}>
                        חברי צוות
                    </Typography>
                    {store.loading ?
                        <>
                            <Typography variant="h4">
                                <Skeleton />
                            </Typography>
                            <Typography variant="h4">
                                <Skeleton />
                            </Typography>
                            <Typography variant="h4">
                                <Skeleton />
                            </Typography>
                        </>
                        :
                    <List >
                    {fansubStore.members?.map((member) => (
                        <ListItem button key={member.user._id} className={classes.listItem} style={listItemBannerStyle(member.user.banner)}>
                            <div style={{marginLeft: 10}} />
                            <ListItemAvatar>
                                <Avatar src={member.user.avatar} className={classes.avatar}/>
                            </ListItemAvatar>
                            <div className={classes.textMargin} />
                            <StyledItemText
                                primary={member.user.username}
                            />
                            <ListItemSecondaryAction>
                                <Box className={classes.sideButtons}>
                                    <IconButton color="primary" aria-label="edit" onClick={onClickEdit(member)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="primary" aria-label="delete" onClick={onClickDelete(member.user._id, member.user.username)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton color="primary" aria-label="launch" onClick={onClickLaunch(member.user._id)}>
                                        <LaunchIcon />
                                    </IconButton>
                                </Box>
                                <Box className={classes.moreButton}>
                                    <IconButton
                                        id="demo-positioned-button"
                                        aria-controls="demo-positioned-menu"
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleMenuClick} color="primary" aria-label="launch">
                                        <MoreVertIcon />
                                    </IconButton>

                                    <Menu
                                        id="demo-positioned-menu"
                                        aria-labelledby="demo-positioned-button"
                                        anchorEl={anchorEl}
                                        open={openMenu}
                                        onClose={() => setAnchorEl(null)}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <MenuItem onClick={() => handleMenuClose(onClickEdit(member))}>
                                            <IconButton aria-label="show 4 new mails" color="inherit">
                                                <EditIcon />
                                            </IconButton>
                                            <p>ערוך</p>
                                        </MenuItem>
                                        <MenuItem onClick={() => handleMenuClose(onClickDelete(member.user._id, member.user.username))}>
                                            <IconButton aria-label="show 4 new mails" color="inherit">
                                                <DeleteIcon />
                                            </IconButton>
                                            <p>מחק</p>
                                        </MenuItem>
                                        <MenuItem onClick={() => handleMenuClose(onClickLaunch(member.user._id))}>
                                            <IconButton aria-label="show 4 new mails" color="inherit">
                                                <LaunchIcon />
                                            </IconButton>
                                            <p>צפייה</p>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                    </List>
                }

                    <AddMemberDialog />

                </Paper>

            </Container>

            {editMember &&
                <EditMemberDialog removeMember={removeMember} member={editMember} open={open} handleClose={handleClose}/>
            }
        </>
    )
}

export default observer(ProjectsContainer);