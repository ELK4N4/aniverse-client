import React, { useState, useEffect } from 'react';
import { addAnime } from '../../stores/UserStore'
import { Link, useHistory, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControl, FormHelperText, Input, InputLabel, Link as MuiLink, ListItemText, MenuItem, Select } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grow, Slide, Paper } from '@material-ui/core';
import useStyles from './style';
import AnimeCard from '../Cards/AnimeCards/AnimeCard';
import AnimeCards from '../Cards/AnimeCards';
import { useStore } from '../../stores';
import { observer } from 'mobx-react-lite';
import { autorun, runInAction } from 'mobx';
import * as api from '../../api';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { animeScheme } from '@aniverse/utils/validations';
import errorMessage from '../../errorMessage';
import InfiniteScroll from 'react-infinite-scroll-component';
import PaperWithHeader, { PaperBody, PaperHeader, PaperHeaderSection } from '../PaperWithHeader';
import SearchBar from '../SearchBar/SearchBar';
import useInfiniteScroll from 'react-infinite-scroll-hook';

const trackingStatus = [
    "בצפייה",
    "נצפה",
    "מתוכנן",
    "נזרק",
]

function TrackingContainer({title, userId, fetchCallback}) {
    const history = useHistory();
    const classes = useStyles();
    const store = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const [keyword, setKeyword] = useState('');
    const [search, setSearch] = useState('');
    const limit = 7;
    const skipStart = 0;
    const [skip, setSkip] = useState(skipStart);
    const [status, setStatus] = useState("בצפייה");

    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState();

    

    useEffect(async () => {
        store.startLoading();
        setLoading(true);
        try {
            const { data } = await fetchCallback(userId, status, search, skipStart, limit);
            if(data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                setSkip(skip + limit);
            }
            setCards(data);
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
            setLoading(false);
        }
    }, [status, search]);

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    }

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }

    const handleOnSearch = async (e) => {
        setSearch(keyword);
        store.startLoading();
        setLoading(true);
        try {
            const { data } = await fetchCallback(userId, status, keyword, skipStart, limit);
            if(data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                setSkip(skip + limit);
            }
            setCards(data);
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
            setLoading(false);
        }
    }

    const fetchMoreData = async () => {
        store.startLoading();
        setLoading(true);
        try {
            const { data } = await fetchCallback(userId, status, search, skip, limit);
            if(data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                setCards([...cards, ...data]);
                setSkip(skip + limit);
            }
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
            setLoading(false);
        }
    }

    const [infiniteRef, { rootRef }] = useInfiniteScroll({
        loading,
        hasNextPage: hasMore,
        onLoadMore: fetchMoreData,
        disabled: !!error,
        rootMargin: '0px 400px 0px 0px',
    });

    return (
        <Container style={{marginTop: 30}}>
            <PaperWithHeader>
                <PaperHeader divider>
                    <PaperHeaderSection align="right" justify="center">
                        <Typography align="center" variant="h4">
                            {title}
                        </Typography>
                    </PaperHeaderSection>
                    <PaperHeaderSection align="center" justify="center">
                        <SearchBar value={keyword} placeholder="חפשו אנימה..." onChange={handleKeywordChange} onSearch={handleOnSearch} />
                    </PaperHeaderSection>
                    <PaperHeaderSection align="left" justify="center" fullWidth>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="select-fansub-label">סטטוס צפייה</InputLabel>
                            <Select
                                labelId="choosen-fansub-label"
                                id="choosen-fansub"
                                value={status}
                                onChange={handleStatusChange}
                                label="סטטוס צפייה"
                            >
                            {trackingStatus.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>                   
                    </PaperHeaderSection>
                </PaperHeader>

                <PaperBody loading={!cards}>
                    <Box display="flex" ref={rootRef} style={{height: 'min-content', overflow: 'auto'}}>
                    {cards.map(({animeId: anime}) => (
                        <div key={anime._id} style={{margin: 15}}>
                            <AnimeCard
                                name={anime.name.hebrew}
                                summary={anime.summary}
                                img={anime.image}
                                showContent
                                timeout={500}
                                rating={anime.rating.avg}
                            />
                        </div>
                    ))}       
                    {hasMore && (
                        <Box ref={infiniteRef}>
                            טוען
                        </Box>
                        )}
                    </Box>
                </PaperBody>
            </PaperWithHeader>
        </Container>
    );
}

export default TrackingContainer;