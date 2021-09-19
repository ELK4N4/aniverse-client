import { makeStyles } from '@material-ui/core/styles';
import background from '../../../assets/home-background.jpg';

export default makeStyles((theme) => ({
    background: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.82)), url('${background}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
    },
    title: {
      color: 'white',
      textShadow: '0px 0px 10px #000000',
      fontSize: 80,
      [theme.breakpoints.down('xs')]: {
        fontSize: 60,
      },
    },
    subtitle: {
      color: 'white',
      textShadow: '0px 0px 10px #000000',
      [theme.breakpoints.down('sm')]: {
        fontSize: 20,
      },
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