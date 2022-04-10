import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    background: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://wallpapercave.com/uwp/uwp1774782.gif')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
    },
    title: {
      color: 'white',
      textShadow: '0px 0px 10px #000000',
      fontSize: 200,
    },
    subtitle: {
      color: 'white',
      textShadow: '0px 0px 10px #000000',
    },
    watchBtn: {
      color: 'white',
      padding: theme.spacing(1.5),
      fontSize: 20,
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(.5),
        fontSize: 20,
      },
    },
}));