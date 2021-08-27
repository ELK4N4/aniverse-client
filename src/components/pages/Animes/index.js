import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import SearchBar from '../../SearchBar/SearchBar';
import { Container } from '@material-ui/core';
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



function Animes() {
    const store = useStore();
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    const [animes, setAnimes] = useState([]);
    const [keyword, setKeyword] = useState(search);

    useEffect( async () => {
        store.startLoading();
        try {
            const { data } = await api.fetchAnimes(keyword);
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

    return (
        <>
            <Container maxWidth="lg">
                <div className={classes.searchBar}>
                    <SearchBar value={keyword} placeholder="חפשו אנימה..." onChange={handleOnChange} onSearch={handleOnSearch} />
                </div>
                <AnimeCards clickable animes={animes} keyword={keyword}/>
            </Container>
            <Link to='/animes/add'>
                <Fab size="large" color="primary" aria-label="add" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Link>
        </>
    )
}

export default Animes;
