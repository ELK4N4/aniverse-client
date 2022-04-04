import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography } from '@material-ui/core';
import useStyles from './style';
import { useHistory } from 'react-router';
import withMaxHeight from '../../hoc/withMaxHeight';
import PaperWithHeader, { PaperBody, PaperHeader, PaperHeaderSection } from '../../components/PaperWithHeader';
import { fetchAnimes, fetchFansubs } from '../../api';
import { useStore } from '../../stores';
import AnimeCards from '../../components/Cards/AnimeCards';
import FansubCards from '../../components/Cards/FansubCards';
import Showcase from './Showcase';

function Home() {
    const classes = useStyles();
    const history = useHistory();
    const store = useStore();
    const [animes, setAnimes] = useState([]);
    const [fansubs, setFansubs] = useState([]);
    
    const watchClick = () => {
        history.push('/animes');
    }

    useEffect(async () => {
        store.startLoading();
        try {
            const animesRes = await fetchAnimes('' , 0, 5);
            const fansubsRes = await fetchFansubs('' , 0, 5);
            setAnimes(animesRes.data);
            setFansubs(fansubsRes.data);
        } catch (err) {
            console.error(err.response);
        } finally {
            store.stopLoading();
        }
    }, []);

    return (
        <>
            <Showcase />
            <Container style={{marginTop: 70, marginBottom: 70}}>
                <PaperWithHeader>
                    <PaperHeader divider>
                        <PaperHeaderSection align="center" justify="center">
                            <Typography style={{fontWeight: 'bold'}} align="center" variant="h4">
                                פרקים חדשים
                            </Typography>
                        </PaperHeaderSection>
                    </PaperHeader>
                    <PaperBody>
                        <AnimeCards clickable animes={animes} />
                    </PaperBody>
                </PaperWithHeader>
            </Container>

            <Container style={{marginTop: 70, marginBottom: 70}}>
                <PaperWithHeader>
                    <PaperHeader divider>
                        <PaperHeaderSection align="center" justify="center">
                            <Typography style={{fontWeight: 'bold'}} align="center" variant="h4">
                                אנימות חדשות
                            </Typography>
                        </PaperHeaderSection>
                    </PaperHeader>
                    <PaperBody>
                        <AnimeCards clickable animes={animes} />
                    </PaperBody>
                </PaperWithHeader>
            </Container>

            <Container style={{marginTop: 70, marginBottom: 70}}>
                <PaperWithHeader>
                    <PaperHeader divider>
                        <PaperHeaderSection align="center" justify="center">
                            <Typography style={{fontWeight: 'bold'}} align="center" variant="h4">
                                פאנסאבים חדשים
                            </Typography>
                        </PaperHeaderSection>
                    </PaperHeader>
                    <PaperBody>
                        <FansubCards clickable fansubs={fansubs} />
                    </PaperBody>
                </PaperWithHeader>
            </Container>
        </>
    );
}

export default Home;