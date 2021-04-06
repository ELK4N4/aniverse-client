import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import SearchBar from './SearchBar/SearchBar';
import { Container } from '@material-ui/core';
import AnimeCards from '../AnimeCards/AnimeCards';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { getAnimes } from '../../actions/animes';


export default function Animes() {
    const dispatch = useDispatch()
    const animes = useSelector(state => state.animes);
    const classes = useStyles();
    const [keyWord, setKeyWord] = useState('');
    //const [animes, setAnimes] = useState(animesArr);

    const handleOnChange = (e) => {
        setKeyWord(e.target.value);
    }

    useEffect(() => {
        dispatch(getAnimes());
    }, [dispatch,])

    return (
        <>
            <Container maxWidth="lg">
                <div className={classes.searchBar}>
                    <SearchBar value={keyWord} onChange={handleOnChange}/>
                </div>
                <AnimeCards clickable animes={animes} keyWord={keyWord}/>
            </Container>
            <Link to='add-anime'>
                <SpeedDial
                    ariaLabel="SpeedDial example"
                    className={classes.speedDial}
                    hidden={false}
                    icon={<SpeedDialIcon />}
                    open={false}
                    direction={'right'}
                    component={Link}
                    to='add-anime'
                />
            </Link>
        </>
    )
}
