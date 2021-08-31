import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Checkbox from '@material-ui/core/Checkbox';
import { DialogContentText, FormControl, Input, InputLabel, Link as MuiLink, ListItemText, MenuItem, Select } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grow, Slide, Paper } from '@material-ui/core';
import AnimeCard from '../../Cards/AnimeCards/AnimeCard'
import useStyles from './style';
import { useStore } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { autorun, runInAction } from 'mobx';


const initAnime = {
    name: {
        hebrew: '',
        english: '',
        japanese: '',
    },
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
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
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

function AnimeDialog({open, handleClose, onSubmit, choosenAnime = initAnime}) {
    const history = useHistory();
    const classes = useStyles();
    const [anime, setAnime] = useState(choosenAnime);

    const handleOnChange = (e) => {
        if(e.target.name.includes('name')) {
            // const animeTemp = {...anime};
            // animeTemp.name[e.target.name.split('.')[1]] = e.target.value;
            // setAnime(animeTemp);
            const animeTemp = {
                name: {...anime.name}
            };
            animeTemp.name[e.target.name.split('.')[1]] = e.target.value;
            setAnime({...anime, name: animeTemp.name});
        } else {
            setAnime({...anime, [e.target.name]: e.target.value});
        }
    };

    const handleSubmit = (e) => {
        onSubmit(anime);
        handleClose();
    };

    return (
        <Dialog scroll="paper" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="confirmation-dialog-title">
                <div>
                    <Typography variant="h5">
                        עריכת אנימה במאגר  
                    </Typography>
                    <Typography variant="body1">
                        {anime.name.hebrew} 
                    </Typography>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name.hebrew"
                    label="שם האנימה"
                    name="name.hebrew"
                    autoFocus
                    value={anime.name.hebrew}
                    onChange={handleOnChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name.english"
                    label="שם האנימה באנגלית"
                    name="name.english"
                    autoComplete="off"
                    value={anime.name.english}
                    onChange={handleOnChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name.japanese"
                    label="שם האנימה ביפנית"
                    name="name.japanese"
                    autoComplete="off"
                    value={anime.name.japanese}
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
                    name={anime.name.hebrew}
                    summary={anime.summary}
                    img={anime.image ? anime.image : 'https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png'}
                    showContent
                    timeout={500}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.submit}
                >
                    שמור
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AnimeDialog