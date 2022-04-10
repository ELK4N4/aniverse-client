import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        width: '100%',
      },
      media: {
        aspectRatio: '1 / 1.6',
      },
      cardActionArea: {
        position: 'relative',
      },
      title: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        color: 'white',
        top: '0px',
        width: '100%',
        overflow: 'hidden',
      },
      content: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        color: 'white',
        top: '0px',
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      padding: {
        padding: theme.spacing(1),
      },
      tinyDetials: {
        position: 'absolute',
        bottom: '10px',
        paddingRight: '10px',
        paddingLeft: '10px',
        width: '100%',
      },
      ratingPaper: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
      },
      ratingText: {
        marginRight: theme.spacing(.5),
        marginLeft: theme.spacing(.5),
      }
}));