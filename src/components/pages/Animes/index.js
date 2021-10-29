import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import SearchBar from '../../SearchBar/SearchBar';
import { CircularProgress, Container, Typography } from '@material-ui/core';
import AnimeCards from '../../Cards/AnimeCards';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useHistory } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useStore } from '../../../stores';
import * as api from '../../../api';
import InfiniteScroll from 'react-infinite-scroll-component';
import BounceLoader from "react-spinners/BounceLoader";

function Animes() {
    const store = useStore();
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    const [animes, setAnimes] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [keyword, setKeyword] = useState(search);
    const limit = 7;
    const skipStart = 0;
    const [skip, setSkip] = useState(skipStart);

    useEffect( async () => {
        window.scrollTo(0, 0);
        setKeyword(search)
        store.startLoading();
        try {
            const { data } = await api.fetchAnimes(search, skipStart, limit);
            if(data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                setSkip(skipStart + limit);
            }
            setAnimes(data);
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    }, [search])

    const handleOnChange = (e) => {
        setKeyword(e.target.value);
    }

    const handleOnSearch = async (e) => {
        history.push({
            pathname: '/animes',
            search: `?search=${keyword}`
        })
    }

    const fetchMoreData = async () => {
        store.startLoading();
        try {
            const { data } = await api.fetchAnimes(search, skip, limit);
            if(data.length === 0) {
                setHasMore(false);
            } else {
                setAnimes([...animes, ...data]);
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
            <div className={classes.showcase} >
                <Container maxWidth="lg" >
                    <Typography variant="h1" align="center" className={classes.pageTitle}>
                        אנימות
                    </Typography>
                </Container>
            </div>
            <Container maxWidth="lg" className={classes.pageContent}>
                <div className={classes.searchBar}>
                    <SearchBar value={keyword} placeholder="חפשו אנימה..." onChange={handleOnChange} onSearch={handleOnSearch} />
                </div>
                <InfiniteScroll
                    dataLength={animes.length} //This is important field to render the next data
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
                        <AnimeCards clickable animes={animes} keyword={keyword}/>
                </InfiniteScroll>
            </Container>
        </>
    )
}

export default Animes;
