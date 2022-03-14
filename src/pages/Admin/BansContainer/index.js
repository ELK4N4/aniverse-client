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
import EditBanDialog from './EditBanDialog';
import { Skeleton } from '@material-ui/lab';
import AddBanDialog from './AddBanDialog';
import { useSnackbar } from 'notistack';
import errorMessage from '../../../errorMessage';
import PaperWithHeader, { PaperHeader, PaperHeaderSection, PaperBody } from '../../../components/PaperWithHeader';
import StyledListItem from '../../../components/StyledListItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from '../../../components/SearchBar/SearchBar';


function BansContainer() {
    const store = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const classes = useStyles();
    const [bans, setBans] = useState([]);
    const [editBan, setEditBan] = useState();
    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [search, setSearch] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const limit = 7;
    const skipStart = 0;
    const [skip, setSkip] = useState(skipStart);

    useEffect(async () => {
        store.startLoading();
        window.scrollTo(0, 0);
        try {
            const { data } = await api.fetchBans(search, skipStart, limit);
            if(data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                setSkip(skipStart + limit);
            }
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

    const handleOnSearch = async (e) => {
        setSearch(keyword);
        store.startLoading();
        try {
            const { data } = await api.fetchBans(keyword, skipStart, limit);
            if(data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                setSkip(skipStart + limit);
            }
            setBans(data);
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
            const { data } = await api.fetchBans(search, skip, limit);
            if(data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                setBans([...bans, ...data]);
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
                    <PaperHeader>
                        <PaperHeaderSection align="bottom" justify="center" fullWidth>
                            <SearchBar value={keyword} placeholder="חפשו משתמש..." onChange={handleOnChange} onSearch={handleOnSearch} />
                        </PaperHeaderSection>
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
                            <InfiniteScroll
                                style={{paddingRight: 7, paddingLeft: 7}}
                                dataLength={bans.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={
                                    <p style={{ textAlign: 'center' }}>
                                        <b></b>
                                    </p>
                                }
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b></b>
                                    </p>
                                }
                                >
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
                            </InfiniteScroll>
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