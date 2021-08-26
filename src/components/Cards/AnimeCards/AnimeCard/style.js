import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        width: 200,
      },
      media: {
        height: 300,
      },
      cardActionArea: {
        position: 'relative',
      },
      title: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        color: 'white',
        top: '0px',
        overflow: 'hidden',
        padding: theme.spacing(1),
      },
      content: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        color: 'white',
        top: '0px',
        overflow: 'hidden',
        padding: theme.spacing(1),
      },
}));