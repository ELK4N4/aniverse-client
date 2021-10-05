import React, { useState, useEffect } from 'react';
import { addAnime } from '../../stores/UserStore'
import { Link, useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
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
import { useStore } from '../../stores';
import { observer } from 'mobx-react-lite';
import { autorun, runInAction } from 'mobx';
import * as api from '../../api';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { animeScheme } from '@aniverse/utils/validations';


const initAnime = {
    name: {
        hebrew: '',
        english: '',
        japanese: '',
    },
    genres: [],
    episodesNumber: 1,
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

function AddAnimeForm() {
    const history = useHistory();
    const classes = useStyles();
    const store = useStore();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        store.startLoading();
        try {
            const { data } = await api.addAnime(values);
            enqueueSnackbar('האנימה נוספה בהצלחה', {variant: 'success'});
            history.push('/animes/' + data._id);
        } catch (err) {
            if (err.response) {
                enqueueSnackbar(err.response.data, {variant: 'error'});
            } else if (err.request) {
                enqueueSnackbar(err.request, {variant: 'error'});
            } else {
                enqueueSnackbar(err.message, {variant: 'error'});
            }
        } finally {
            store.stopLoading();
        }
    };

    const formik = useFormik({ initialValues: initAnime,
        validateOnBlur: true,
        onSubmit: handleSubmit,
        validationSchema: animeScheme
    });

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
                        <form autoComplete="off" className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                            <TextField
                                error={formik.touched.name?.hebrew && formik.errors.name?.hebrew}
                                helperText={formik.touched.name?.hebrew && formik.errors.name?.hebrew}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name.hebrew"
                                label="שם האנימה"
                                name="name.hebrew"
                                autoFocus
                                onChange={formik.handleChange}
                                value={formik.values.name.hebrew}
                            />
                            <TextField
                                error={formik.touched.name?.english && formik.errors.name?.english}
                                helperText={formik.touched.name?.english && formik.errors.name?.english}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name.english"
                                label="שם האנימה באנגלית"
                                name="name.english"
                                autoComplete="off"
                                onChange={formik.handleChange}
                                value={formik.values.name.english}
                            />
                            <TextField
                                error={formik.touched.name?.japanese && formik.errors.name?.japanese}
                                helperText={formik.touched.name?.japanese && formik.errors.name?.japanese}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name.japanese"
                                label="שם האנימה ביפנית"
                                name="name.japanese"
                                autoComplete="off"
                                onChange={formik.handleChange}
                                value={formik.values.name.japanese}
                            />
                            <FormControl
                                error={formik.touched.genres && formik.errors.genres}
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
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.genres}
                                    renderValue={(selected) => selected.join(", ")}
                                    MenuProps={MenuProps}
                                    label="ז'אנרים"
                                    name="genres"
                                >
                                {genres.map((genre) => (
                                    <MenuItem key={genre} value={genre}>
                                        <Checkbox
                                            color="primary"
                                            checked={formik.values.genres.indexOf(genre) > -1}
                                        />
                                        <ListItemText primary={genre} />
                                    </MenuItem>
                                ))}
                                </Select>
                                <FormHelperText>{formik.touched.genres && formik.errors.genres}</FormHelperText>
                            </FormControl>
                            <TextField
                                error={formik.touched.episodesNumber && formik.errors.episodesNumber}
                                helperText={formik.touched.episodesNumber && formik.errors.episodesNumber}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="episodesNumber"
                                type="number"
                                label="מספר פרקים"
                                name="episodesNumber"
                                autoComplete="off"
                                onChange={formik.handleChange}
                                value={formik.values.episodesNumber}
                            />
                            <TextField
                                error={formik.touched.summary && formik.errors.summary}
                                helperText={formik.touched.summary && formik.errors.summary}
                                onBlur={formik.handleBlur}
                                id="summary"
                                name="summary"
                                label="תקציר"
                                margin="normal"
                                multiline
                                minRows={4}
                                required
                                fullWidth
                                variant="outlined"
                                autoComplete="off"
                                onChange={formik.handleChange}
                                value={formik.values.summary}
                            />
                            <TextField
                                error={formik.touched.image && formik.errors.image}
                                helperText={formik.touched.image && formik.errors.image}
                                onBlur={formik.handleBlur}
                                id="image"
                                name="image"
                                label="לינק לתמונה"
                                margin="normal"
                                fullWidth
                                variant="outlined"
                                autoComplete="off"
                                onChange={formik.handleChange}
                                value={formik.values.image}
                            />
                            <Typography component="h6" variant="h5">
                                תצוגה מקדימה
                            </Typography>
                            <AnimeCard
                                name={formik.values.name.hebrew}
                                summary={formik.values.summary}
                                img={formik.values.image ? formik.values.image : 'https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png'}
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

export default AddAnimeForm;