import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import useStyles from './style';


export default function AnimeCard({ img, name, summary, showContent, timeout, width, height }) {
  const classes = useStyles();

  const [hover, setHover] = useState(false);

  const toggleHover = () => setHover(!hover);

  return (
    <Grow in timeout={700}>
        <Card className={classes.root}
        onMouseOver={toggleHover} 
        onMouseOut={toggleHover} 
        raised={hover}
        style={{width}}
        >
        <CardActionArea className={classes.cardActionArea}>
            <CardMedia
                component="img"
                className={classes.media}
                image={ img }
                title= { name.hebrew }
                style={{height}}
            />
            <Grow in={hover && showContent} mountOnEnter unmountOnExit>
                <Paper square className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2">
                        { name.hebrew }
                    </Typography>
                    <Typography variant="body2" component="p">
                        { summary }
                    </Typography>
                </Paper>
            </Grow>
        </CardActionArea>
        </Card>
    </Grow>
  );
}