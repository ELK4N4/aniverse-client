import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import { Paper, Slide } from '@material-ui/core';
import useStyles from './style';


export default function FansubCard({ img, name, showContent, timeout }) {
  const classes = useStyles();

  const [hover, setHover] = useState(false);

  const toggleHover = () => setHover(!hover);

  return (
    <Grow in timeout={700}>
        <Card className={classes.root}
        onMouseOver={toggleHover} 
        onMouseOut={toggleHover} 
        raised={hover}
        >
        <CardActionArea className={classes.cardActionArea}>
            <CardMedia
                component="img"
                className={classes.media}
                image={ img ? img : "https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png" }
                title= { name }
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src="https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png";
                }}
            />
            <Paper square className={!hover ? classes.content : classes.contentHover}>
                <div className={classes.padding}>
                    <Typography align="center" gutterBottom variant="h5" component="h2">
                        { name }
                    </Typography>
                </div>
            </Paper>
        </CardActionArea>
        </Card>
    </Grow>
  );
}