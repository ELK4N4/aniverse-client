import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import useStyles from './style';


export default function EpisodeCard({ image, name, number, showContent, timeout }) {
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
                image={ image ? image :  "https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png"}
                title= { name }
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src="https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png";
                }}
            />
            <Grow in={hover && showContent} mountOnEnter unmountOnExit>
                <Paper square className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2">
                        { number }
                    </Typography>
                    <Typography variant="body2" component="p">
                        { name }
                    </Typography>
                </Paper>
            </Grow>
        </CardActionArea>
        </Card>
    </Grow>
  );
}