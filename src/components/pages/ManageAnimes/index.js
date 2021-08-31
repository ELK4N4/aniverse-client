import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import SearchBar from '../../SearchBar/SearchBar';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import { Avatar, Container, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import FansubCards from '../../Cards/FansubCards';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useStore } from '../../../stores';
import * as api from '../../../api';
import AnimeDialog from './AnimeDialog';


function ManageAnimes() {
    const store = useStore();
    const { userStore } = store;
    const history = useHistory();
    const classes = useStyles();
    const [animes, setAnimes] = useState([]);
    const [open, setOpen] = useState(false);
    const [choosenAnime, setChoosenAnime] = useState();
    const [keyword, setKeyword] = useState('');

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

    const deleteAnime = async (animeId) => {
        // store.startLoading();
        // try {
        //     await api.deleteFansub(animeId)
        //     setAnimes(animes.filter((anime) => anime._id !== animeId));
        // } catch (err) {
        //     console.error(err.response);
        // } finally {
        //     store.stopLoading();
        // }
    }

    const updateAnime = async (updatedAnime) => {
        store.startLoading();
        try {
            const { data } = await api.updateAnime(updatedAnime._id ,updatedAnime)
            const editAnimeIndex = animes.findIndex(anime => updatedAnime._id === anime._id);
            const animesTemp = [...animes];
            animesTemp[editAnimeIndex] = data;
            setAnimes(animesTemp);
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    }
    

    return (
        <>
            <Container maxWidth="lg">
                <Paper elevation={5} className={classes.paper}>
                    <Typography align="center" component="h1" variant="h5" className={classes.title}>
                        ניהול אנימות
                    </Typography>
                    <List >
                    {animes.map((anime) => (
                        <ListItem button key={anime._id} onClick={() => onAnimeClick(anime)}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PeopleAltRoundedIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={anime.name.hebrew}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteAnime(anime._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                    </List>
                </Paper>
            </Container>

            <Link to='/animes/add'>
                <Fab size="large" color="primary" aria-label="add" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Link>

            {open && <AnimeDialog onSubmit={updateAnime} handleClose={handleClose} open={open} choosenAnime={choosenAnime}/>}
        </>
    )
}

export default ManageAnimes;