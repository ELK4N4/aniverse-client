import React, { useState, useEffect } from 'react';
import { addAnime } from '../../stores/UserStore'
import { Link, useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControl, Input, InputLabel, Link as MuiLink, ListItemText, MenuItem, Select } from '@material-ui/core/';
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
    genres: [],
    episodesNumber: 0,
    summary: '',
    image: ''
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 50;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const genres = [
    'אקשן',
    'הרפתקה',
    'דרמה',
    'קומדיה',
    'חיי היומיום',
    'פנטזיה',
    'קסם',
    'על טבעי',
    'אימה',
    'מסתורין',
    'פסיכולוגי',
    'רומנטיקה',
    'מדע בדיוני',
    'סייברפאנק',
    'האצ\'י',
    'שדים',
    'הארם',
    'אומנות לחימה',
    'היסטוריה',
    'איסקאי',
    'מוזיקה',
    'פרודיה',
    'פוסט אפוקליפטי',
    'בית ספר',
    'סיינן',
    'שונן',
    'שוג\'ו',
    'חלל',
    'ספורט',
    'טרגדיה',
];

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
                            <FormControl
                                margin="normal"
                                fullWidth
                                variant="outlined"
                                className={classes.selectControl}
                                required
                            >
                                <InputLabel id="genres-label">ז'אנרים</InputLabel>
                                <Select
                                labelId="genres"
                                id="genres"
                                multiple
                                value={anime.genres}
                                onChange={handleOnChange}
                                renderValue={(selected) => selected.join(", ")}
                                MenuProps={MenuProps}
                                label="ז'אנרים"
                                name="genres"
                                >
                                {genres.map((genre) => (
                                    <MenuItem key={genre} value={genre}>
                                    <Checkbox
                                        color="primary"
                                        checked={anime.genres.indexOf(genre) > -1}
                                    />
                                    <ListItemText primary={genre} />
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
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