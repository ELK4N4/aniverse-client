import { fade } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { BorderBottom } from '@material-ui/icons';

export default makeStyles((theme) => ({
    showcase: {
        background: `linear-gradient(to top right,${theme.palette.primary.main} 0%, #000000 100%)`,
        padding: theme.spacing(8),
        paddingTop: theme.spacing(9),
        paddingBottom: theme.spacing(22),
        borderBottom: `7px solid black`,
    },
    container: {
        marginTop: -theme.spacing(10),
    }
}));
  