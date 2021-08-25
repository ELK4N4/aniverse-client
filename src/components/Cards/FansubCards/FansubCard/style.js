import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        width: 200,
      },
      media: {
        height: 200,
      },
      cardActionArea: {
        position: 'relative',
      },
      content: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        color: 'white',
        top: '0px',
        width: '100%',
        maxHeight: '30%',
        overflow: 'hidden',
        padding: theme.spacing(2)
      },
}));