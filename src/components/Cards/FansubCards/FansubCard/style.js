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
        overflow: 'hidden',
      },
      padding: {
        padding: theme.spacing(1.5),
        paddingBottom:  0,
      }
}));