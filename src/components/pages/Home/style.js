import { makeStyles } from '@material-ui/core/styles';
import background from '../../../assets/home-background.jpg';

export default makeStyles((theme) => ({
    background: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${background}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
    }
  }));