import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SearchBar from '../../../../../SearchBar/SearchBar';
import { Chip, Container } from '@material-ui/core';
import * as api from '../../../../../../api';
import ProjectCards from './ProjectCards';
import { Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../../../stores';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    appBar: {
        position: 'fixed',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    searchBar: {
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(7),
    },
    choosenPaper: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0),
        margin: 0,
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        maxHeight: '50px',
        overflow: 'auto'
    },
    chip: {
        margin: theme.spacing(1),
    },
}));



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ProjectsDialog({ open, filteredProjects, handleDialogClose }) {
    const classes = useStyles();
    const { fansubId } = useParams();
    const store = useStore();
    const { fansubStore } = store;
    const { enqueueSnackbar } = useSnackbar();
    const [keyword, setKeyword] = useState('');
    const animes = useRef([]);
    const choosenAnimes = useRef([]);
    const [filteredAnimes, setFilteredAnimes] = useState([]);

    useEffect(async () => {
        try {
            const { data } = await api.fetchAnimes();
            animes.current = data;
            animes.current = animes.current.filter(anime => !filteredProjects.some(filteredProject => filteredProject.anime._id === anime._id));
            setFilteredAnimes(animes.current);
        } catch (err) {
            console.error(err.response);
        }
    }, [filteredProjects]);

    const filterAnimeArr = () => {
        setFilteredAnimes(animes.current.filter(anime => !choosenAnimes.current.some(choosenAnime => choosenAnime._id === anime._id) ));
    }

    const handleOnChange = (e) => {
        setKeyword(e.target.value);
    }

    const handleOnSearch = async (e) => {
        try {
            const { data } = await api.fetchAnimes(keyword);
            animes.current = data;
            animes.current = animes.current.filter(anime => !filteredProjects.some(filteredProject => filteredProject.anime._id === anime._id));
            filterAnimeArr();
        } catch (err) {
            console.error(err.response);
        }
    }

    const onProjectSelect = (project) => {
        choosenAnimes.current = [...choosenAnimes.current, project];
        animes.current = animes.current.filter(anime => !filteredProjects.some(filteredProject => filteredProject.anime._id === anime._id));
        filterAnimeArr();
    }

    const handleDeleteProject = (project) => {
        choosenAnimes.current = choosenAnimes.current.filter(val => val._id !== project._id);
        filterAnimeArr();
    }

    const addProjects = () => {
        choosenAnimes.current.forEach(async project => {
            fansubStore.addProject(project,
                () => {
                    enqueueSnackbar('הפרוייקט נוסף', {variant: 'success'});
                },
                (error) => {
                    enqueueSnackbar(error, {variant: 'error'});
                })
        });
        handleDialogClose();
        choosenAnimes.current = [];
    }

    return (
        <Dialog fullScreen open={open} onClose={handleDialogClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar} position="fixed">
                <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleDialogClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
                <Typography variant="h5" className={classes.title}>
                    הוספת פרוייקטים
                </Typography>
                <Paper component="ul" className={classes.choosenPaper}>
                    {choosenAnimes.current.map((project) => (
                        <li key={project._id}>
                            <Chip
                                label={project.name.hebrew}
                                onDelete={() => handleDeleteProject(project)}
                                className={classes.chip}
                            />
                        </li>
                    ))}
                </Paper>
                <Button autoFocus variant="outlined" color="inherit" onClick={addProjects} disabled={ choosenAnimes.current.length === 0}>
                    הוסף
                </Button>
                </Toolbar>
            </AppBar>
            
            <div className={classes.appBarSpacer}></div>

            

            <Container maxWidth="lg">
                <div className={classes.searchBar}>
                    <SearchBar value={keyword} placeholder="חפשו אנימה..." onChange={handleOnChange} onSearch={handleOnSearch} />
                </div>
                <ProjectCards clickable animes={filteredAnimes} onProjectSelect={onProjectSelect}/>
            </Container>
        </Dialog>
    );
}

export default observer(ProjectsDialog);