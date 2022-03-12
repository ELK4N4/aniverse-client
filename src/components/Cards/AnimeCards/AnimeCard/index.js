import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import { Box, Chip, Paper, Slide, Zoom } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import useStyles from './style';
import { Rating } from '@material-ui/lab';


export default function AnimeCard({ img, name, summary, rating, showContent, timeout, width, height }) {
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  const toggleHover = () => setHover(!hover);

  return (
    <Grow in timeout={300}>
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
                    image={ img ? img : "https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png" }
                    title= { name.hebrew }
                    style={{height}}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src="https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png";
                    }}
                />
                <Slide in={!hover && showContent} direction="down">
                        <Paper square className={classes.title}>
                            <div className={classes.padding}>
                                <Typography align="center" variant="h5" component="h2">
                                    { name }
                                </Typography>
                            </div>
                        </Paper>
                        
                </Slide>
                <Slide in={hover && showContent} direction="up">
                    <Paper square className={classes.content}>
                        <div className={classes.padding}>
                            <Typography align="center" gutterBottom variant="h5" component="h2">
                                { name }
                            </Typography>
                            <Typography variant="body2" component="p">
                                { summary }
                            </Typography>
                        </div>
                    </Paper>
                </Slide>
                <Box display="flex" className={classes.tinyDetials} justifyContent="end">
                    <Paper className={classes.ratingPaper} >
                        <Typography className={classes.ratingText} align="center" variant="body1">{rating || 'ללא'}</Typography>
                        <StarIcon color="primary" style={{color: '#ffb400'}}/>
                    </Paper>
                </Box>
            </CardActionArea>
        </Card>
    </Grow>
  );
}