import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from '../style';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import { Avatar, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import { useStore } from '../../../stores';
import * as api from '../../../api';
import AnimeDialog from './AnimeDialog';
import { useSnackbar } from 'notistack';
import errorMessage from '../../../errorMessage';
import PaperWithHeader, { PaperHeader, PaperHeaderSection, PaperBody } from '../../../components/PaperWithHeader';
import AddIconButton from '../../../components/AddIconButton';
import StyledListItem from '../../../components/StyledListItem';
import SearchBar from '../../../components/SearchBar/SearchBar';


function ManageAnimes() {
    const store = useStore();
    const { userStore } = store;
    const history = useHistory();
    const classes = useStyles();
    const [animes, setAnimes] = useState([]);
    const [open, setOpen] = useState(false);
    const [choosenAnime, setChoosenAnime] = useState();
    const { enqueueSnackbar } = useSnackbar();
    const [keyword, setKeyword] = useState('');
    const [search, setSearch] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const limit = 7;
    const skipStart = 0;
    const [skip, setSkip] = useState(skipStart);

    useEffect(async () => {
        store.startLoading();
        try {
            const { data } = await api.fetchAnimes();
            console.log(data);
            setAnimes(data);
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    }, [])

    const onAnimeClick = (anime) => {
        setChoosenAnime(anime);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const deleteAnime = async (animeId, name) => {
        if (window.confirm("למחוק את האנימה " + name + " ?")) {
            store.startLoading();
            try {
                await api.deleteAnime(animeId);
                setAnimes(animes.filter((anime) => anime._id !== animeId));
            } catch (err) {
                console.error(err.response);
            } finally {
                store.stopLoading();
            }
        }
    }

    const updateAnime = async (updatedAnime) => {
        store.startLoading();
        try {
            const { data } = await api.updateAnime(updatedAnime._id ,updatedAnime)
            const editAnimeIndex = animes.findIndex(anime => updatedAnime._id === anime._id);
            const animesTemp = [...animes];
            animesTemp[editAnimeIndex] = data;
            setAnimes(animesTemp);
            handleClose();
            enqueueSnackbar('האנימה עודכנה', {variant: 'success'});
        } catch (err) {
            enqueueSnackbar(errorMessage(err), {variant: 'error'});
        } finally {
            store.stopLoading();
        }
    }

    const handleOnChange = (e) => {
        setKeyword(e.target.value);
    }

    const handleOnSearch = async (e) => {
        setSearch(keyword);
        store.startLoading();
        try {
            const { data } = await api.fetchAnimes(keyword, skipStart, limit);
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
    }

    

    return (
        <>
            <Container maxWidth="lg">
                <PaperWithHeader>
                    <PaperHeader divider>
                        <PaperHeaderSection align="center" justify="center">
                            <Typography align="center" variant="h5">
                                ניהול אנימות
                            </Typography>
                        </PaperHeaderSection>
                        <PaperHeaderSection align="left" justify="end">
                            <AddIconButton
                                aria-label="open drawer"
                                onClick={() => history.push('/animes/add')}
                            />
                        </PaperHeaderSection>
                        <PaperHeaderSection align="bottom" justify="center" fullWidth>
                            <SearchBar value={keyword} placeholder="חפשו אנימה..." onChange={handleOnChange} onSearch={handleOnSearch} />
                        </PaperHeaderSection>
                    </PaperHeader>
                    <PaperBody loading={!animes}>
                        <List >
                            {animes.map((anime) => (
                                <StyledListItem
                                    key={anime._id}
                                    text={anime.name.hebrew}
                                    avatar={anime.image}
                                    banner={anime.image}
                                    onClick={() => onAnimeClick(anime)}
                                    controls={[
                                        {
                                            icon: <EditIcon />,
                                            text: 'ערוך',
                                            onClick: () => onAnimeClick(anime)
                                        },
                                        {
                                            icon: <DeleteIcon />,
                                            text: 'מחק',
                                            onClick: () => deleteAnime(anime._id, anime.name.hebrew)
                                        },
                                        {
                                            icon: <LaunchIcon />,
                                            text: 'צפייה',
                                            onClick: () => window.open('/animes/' + anime._id, '_blank', 'noopener,noreferrer')
                                        },
                                    ]}
                                />
                            ))}
                        </List>
                    </PaperBody>
                </PaperWithHeader>
            </Container>

            {open && <AnimeDialog onSubmit={updateAnime} handleClose={handleClose} open={open} choosenAnime={choosenAnime}/>}
        </>
    )
}

export default ManageAnimes;