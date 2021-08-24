import React, { useState, useEffect } from 'react';
import { addAnime } from '../../stores/UserStore'
import { Link, useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link as MuiLink } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grow, Slide, Paper } from '@material-ui/core';
import useStyles from './style';
import AnimeCard from '../Cards/AnimeCards/AnimeCard';
import { useStore } from '../../stores';
import { observer } from 'mobx-react-lite';
import { autorun, runInAction } from 'mobx';


const initAnime = {
    hebrewName: '',
    englishName: '',
    japaneseName: '',
    genre: '',
    episodesNumber: 0,
    summary: '',
    image: ''
}

function AddAnimeForm() {
    const history = useHistory();
    const classes = useStyles();
    const { animeStore } = useStore();
    const [anime, setAnime] = useState(initAnime);

    useEffect(
        () =>
          autorun(() => {
            if(animeStore.state === 'done') {
                history.push('/');
                runInAction(() => {
                    animeStore.resetState();
                });
            }
        })
    ,[])
    
    const handleOnChange = (e) => {
        setAnime({...anime, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        animeStore.addAnime(anime);
    };

    return (
        <Grow in>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Paper elevation={5} className={classes.paper}>
                    <Slide direction="down" in timeout={500}>
                        <Typography component="h1" variant="h5">
                            הוספת אנימה למאגר
                        </Typography>
                    </Slide>
                    <Slide direction="left" in timeout={300}>
                        <form autoComplete="off" className={classes.form} noValidate onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="hebrewName"
                                label="שם האנימה"
                                name="hebrewName"
                                autoFocus
                                value={anime.hebrewName}
                                onChange={handleOnChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="englishName"
                                label="שם האנימה באנגלית"
                                name="englishName"
                                autoComplete="off"
                                value={anime.englishName}
                                onChange={handleOnChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="japaneseName"
                                label="שם האנימה ביפנית"
                                name="japaneseName"
                                autoComplete="off"
                                value={anime.japaneseName}
                                onChange={handleOnChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="genre"
                                label="ז'אנר"
                                name="genre"
                                autoComplete="off"
                                value={anime.genre}
                                onChange={handleOnChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="episodesNumber"
                                type="number"
                                label="מספר פרקים"
                                name="episodesNumber"
                                autoComplete="off"
                                value={anime.episodesNumber}
                                onChange={handleOnChange}
                            />
                            <TextField
                                id="summary"
                                name="summary"
                                label="תקציר"
                                margin="normal"
                                multiline
                                required
                                fullWidth
                                variant="outlined"
                                autoComplete="off"
                                value={anime.summary}
                                onChange={handleOnChange}
                            />
                            <TextField
                                id="image"
                                name="image"
                                label="לינק לתמונה"
                                margin="normal"
                                required
                                fullWidth
                                variant="outlined"
                                autoComplete="off"
                                value={anime.image}
                                onChange={handleOnChange}
                            />
                            <Typography component="h6" variant="h5">
                                תצוגה מקדימה
                            </Typography>
                            <AnimeCard
                                name={anime.hebrewName}
                                summary={anime.summary}
                                img={anime.image ? anime.image : 'https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png'}
                                showContent
                                timeout={500}
                            />
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                הוסף
                            </Button>
                        </form>
                    </Slide>
                </Paper>
            </Container>
        </Grow>
    );
}

export default observer(AddAnimeForm);