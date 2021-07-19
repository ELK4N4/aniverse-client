import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import useStyles from './style';


export default function FansubCard({ img, name, summary, showContent, timeout }) {
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
                image={ img }
                title= { name }
            />
            <Grow in={hover && showContent} mountOnEnter unmountOnExit>
                <Paper square className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2">
                        { name }
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