import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FansubCard from './FansubCard';
import useStyles from './style';
import { useHistory } from 'react-router-dom';

export default function FansubCards({ clickable, fansubs, keyword }) {
    const classes = useStyles();
    const history = useHistory();

    
    const handleClick = (fansubId) => {
        if(clickable) {
            history.push('fansubs/' + fansubId);
        }
    }

    return (
        <Grid
            className={classes.root}
            container
            spacing={5}
            direction="row"
            justify="center"
            alignItems="center"
            //align="center"
            //justify="flex-start"
        >
            {fansubs.map((fansub) => (
                <Grid item xs='auto' key={fansub._id} className={ clickable ? classes.card : null } onClick={() => handleClick(fansub._id)}>
                    <FansubCard
                        name={fansub.name}
                        summary={fansub.summary}
                        img={fansub.avatar}
                        showContent
                        timeout={500}
                    />
                </Grid>
            ))}
        </Grid >
    );
}