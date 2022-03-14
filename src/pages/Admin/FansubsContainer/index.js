import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import useStyles from '../style';
import EditIcon from '@material-ui/icons/Edit';
import { Avatar, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useStore } from '../../../stores';
import * as api from '../../../api';
import FansubDialog from './FansubDialog';
import { useSnackbar } from 'notistack';
import errorMessage from '../../../errorMessage';
import PaperWithHeader, { PaperHeader, PaperHeaderSection, PaperBody } from '../../../components/PaperWithHeader';
import StyledListItem from '../../../components/StyledListItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from '../../../components/SearchBar/SearchBar';


function FansubsContainer() {
    const store = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const classes = useStyles();
    const [fansubs, setFansubs] = useState([]);
    const [clickedFansub, setClickedFansub] = useState();
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
            const { data } = await api.fetchUnconfirmedFansubs(search, skipStart, limit);
            if(data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                setSkip(skipStart + limit);
            }
            setFansubs(data);
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    }, []);

    const handleClickOpen = (ban) => {
        setClickedFansub(ban);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const confirmFansub = async (fansubId, name) => {
        store.startLoading();
        try {
            const { data } = await api.confirmFansub(fansubId);
            setFansubs(fansubs.filter((fansub) => fansub._id !== fansubId));
            enqueueSnackbar('הפאנסאב אושר בהצלחה', {variant: 'success'});
            handleClose();
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }

    const unconfirmFansub = async (fansubId, name) => {
        store.startLoading();
        try {
            const { data } = await api.deleteFansub(fansubId);
            setFansubs(fansubs.filter((fansub) => fansub._id !== fansubId));
            enqueueSnackbar('הפאנסאב נדחה', {variant: 'success'});
            handleClose();
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }

    const handleOnSearch = async (e) => {
        setSearch(keyword);
        store.startLoading();
        try {
            const { data } = await api.fetchUnconfirmedFansubs(keyword, skipStart, limit);
            if(data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                setSkip(skipStart + limit);
            }
            setFansubs(data);
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
            const { data } = await api.fetchUnconfirmedFansubs(search, skip, limit);
            if(data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                setFansubs([...fansubs, ...data]);
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
                            <SearchBar value={keyword} placeholder="חפשו פאנסאב..." onChange={handleOnChange} onSearch={handleOnSearch} />
                        </PaperHeaderSection>
                        <PaperHeaderSection align="center" justify="center">
                            <Typography align="center"variant="h5">
                                אישור פאנסאבים
                            </Typography>
                        </PaperHeaderSection>
                    </PaperHeader>
                    <PaperBody loading={!fansubs}>
                        <List >
                            <InfiniteScroll
                                style={{paddingRight: 7, paddingLeft: 7}}
                                dataLength={fansubs.length}
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
                                   {fansubs?.map((fansub) => (
                                        <StyledListItem
                                            key={fansub._id}
                                            text={fansub.name}
                                            avatar={fansub.avatar}
                                            banner={fansub.banner}
                                            onClick={() => handleClickOpen(fansub)}
                                            controls={[
                                                {
                                                    icon: <DoneIcon />,
                                                    text: 'אישור',
                                                    onClick: () => confirmFansub(fansub._id, fansub.name)
                                                },
                                                {
                                                    icon: <CloseIcon />,
                                                    text: 'דחייה',
                                                    onClick: () => unconfirmFansub(fansub._id, fansub.name)
                                                },
                                                {
                                                    icon: <UnfoldMoreIcon />,
                                                    text: 'צפייה',
                                                    onClick: () => handleClickOpen(fansub)
                                                },
                                            ]}
                                        />
                                    ))}
                            </InfiniteScroll>
                        </List>
                    </PaperBody>
                </PaperWithHeader>
            </Container>

            {clickedFansub &&
                <FansubDialog confirmFansub={() => confirmFansub(clickedFansub._id, clickedFansub.name)} unconfirmFansub={() => unconfirmFansub(clickedFansub._id, clickedFansub.name)} fansub={clickedFansub} open={open} handleClose={handleClose}/>
            }
        </>
    )
}

export default FansubsContainer;