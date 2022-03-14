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
import { useStore } from '../../../stores';
import * as api from '../../../api';
import EditAdminDialog from './EditAdminDialog';
import { Skeleton } from '@material-ui/lab';
import AddAdminDialog from './AddAdminDialog';
import { useSnackbar } from 'notistack';
import errorMessage from '../../../errorMessage';
import SearchBar from '../../../components/SearchBar/SearchBar';
import PaperWithHeader, { PaperHeader, PaperHeaderSection, PaperBody } from '../../../components/PaperWithHeader';
import InfiniteScroll from 'react-infinite-scroll-component';
import StyledListItem from '../../../components/StyledListItem';


function AdminsContainer() {
    const store = useStore();
    const { userStore } = store;
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const classes = useStyles();
    const [admins, setAdmins] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [search, setSearch] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [editAdmin, setEditAdmin] = useState();
    const [open, setOpen] = useState(false);
    const limit = 7;
    const skipStart = 0;
    const [skip, setSkip] = useState(skipStart);

    useEffect(async () => {
        window.scrollTo(0, 0);
        store.startLoading();
        try {
            const { data } = await api.fetchAdmins(search, skipStart, limit);
            if(data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                setSkip(skipStart + limit);
            }
            setAdmins(data);
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    }, []);

    const handleClickOpen = (admin) => {
        setEditAdmin(admin);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const addAdminToArr = async (admin) => {
        setAdmins([...admins, admin]);
    }

    const updateAdminInArr = async (userId, updatedAdmin) => {
        const adminIndex = admins.findIndex((admin) => admin._id === userId);
        const helper = [...admins];
        helper[adminIndex] = updatedAdmin;
        setAdmins(helper);
    }

    const removeAdmin = async (userId, username) => {
        if (window.confirm("להסיר את " + username + " ?")) {
            store.startLoading();
            try {
                const { data } = await api.deleteAdmin(userId);
                setAdmins(admins.filter((admin) => admin._id !== userId));
                enqueueSnackbar('האדמין הוסר בהצלחה', {variant: 'success'});
            } catch (err) {
                enqueueSnackbar(errorMessage(err), {variant: 'error'});
            } finally {
                store.stopLoading();
            }
        }
    }

    const handleOnSearch = async (e) => {
        setSearch(keyword);
        store.startLoading();
        try {
            const { data } = await api.fetchAdmins(keyword, skipStart, limit);
            if(data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                setSkip(skipStart + limit);
            }
            setAdmins(data);
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    }

    const handleOnChange = (e) => {
        setKeyword(e.target.value);
    }

    const fetchMoreData = async () => {
        store.startLoading();
        try {
            const { data } = await api.fetchAdmins(search, skip, limit);
            if(data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                setAdmins([...admins, ...data]);
                setSkip(skip + limit);
            }
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    }

    return (
        <>
            <Container maxWidth="lg">
                <PaperWithHeader>
                    <PaperHeader divider>
                        <PaperHeaderSection align="bottom" justify="center" fullWidth>
                            <SearchBar value={keyword} placeholder="חפשו אדמין..." onChange={handleOnChange} onSearch={handleOnSearch} />
                        </PaperHeaderSection>
                        <PaperHeaderSection align="center" justify="center">
                            <Typography align="center"variant="h5">
                                אדמינים
                            </Typography>
                        </PaperHeaderSection>
                        <PaperHeaderSection align="left" justify="end">
                            <AddAdminDialog addAdminToArr={addAdminToArr}/>
                        </PaperHeaderSection>
                    </PaperHeader>

                    <PaperBody loading={!admins}>
                        <List >
                            <InfiniteScroll
                                style={{paddingRight: 7, paddingLeft: 7}}
                                dataLength={admins.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={
                                    <p style={{ textAlign: 'center' }}>
                                        <b>טוען</b>
                                    </p>
                                }
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                                >
                                   {admins?.map((admin) => (
                                        <StyledListItem
                                            key={admin._id}
                                            text={admin.username}
                                            secondaryText={admin.role}
                                            avatar={admin.avatar}
                                            banner={admin.banner}
                                            onClick={() => handleClickOpen(admin)}
                                            controls={[
                                                {
                                                    icon: <EditIcon />,
                                                    text: 'ערוך',
                                                    onClick: () => handleClickOpen(admin)
                                                },
                                                {
                                                    icon: <DeleteIcon />,
                                                    text: 'מחק',
                                                    onClick: () => removeAdmin(admin._id, admin.username)
                                                },
                                                {
                                                    icon: <LaunchIcon />,
                                                    text: 'צפייה',
                                                    onClick: () => window.open('/users/' + admin._id, '_blank', 'noopener,noreferrer')
                                                },
                                            ].filter(control => (admin._id !== userStore.user.user._id) || (control.text !== "מחק"))}
                                        />
                                    ))}
                            </InfiniteScroll>
                            
                        </List>
                    </PaperBody>
                </PaperWithHeader>
            </Container>

            {editAdmin &&
                <EditAdminDialog removeAdmin={removeAdmin} updateAdminInArr={updateAdminInArr} admin={editAdmin} open={open} handleClose={handleClose}/>
            }
        </>
    )
}

export default AdminsContainer;