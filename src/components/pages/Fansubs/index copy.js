import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import useStyles from './style';
import SearchBar from '../../SearchBar/SearchBar';
import { Container } from '@material-ui/core';
import FansubCards from '../../Cards/FansubCards';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useStore } from '../../../stores';
import * as api from '../../../api';


function Fansubs() {
    const store = useStore();
    const history = useHistory();
    const classes = useStyles();
    const [fansubs, setFansubs] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(async () => {
        store.startLoading();
        try {
            const { data } = await api.fetchFansubs();
            console.log(data);
            setFansubs(data);
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    }, [])

    const handleOnChange = (e) => {
        setKeyword(e.target.value);
    }

    return (
        <>
            <Container maxWidth="lg">
                <div className={classes.searchBar}>
                    <SearchBar value={keyword} placeholder="חפשו פאנסאב..." onChange={handleOnChange}/>
                </div>
                <FansubCards clickable fansubs={fansubs} keyword={keyword}/>
            </Container>
            <Link to='/fansubs/add'>
                <Fab size="large" color="primary" aria-label="add" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Link>
        </>
    )
}

export default Fansubs;