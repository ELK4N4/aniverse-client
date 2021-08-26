import { fade } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { BorderBottom } from '@material-ui/icons';

export default makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(8),
    },
    userHeader: {
        marginTop: -theme.spacing(20),
        '& > *': {
            marginRight: theme.spacing(3)
        }
    },
    userImage: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        border: '8px solid white',
    },
    username: {
        color: 'white',
        textShadow: '0px 0px 10px #000000',
    },
    roleChip: {
        boxShadow: '0px 0px 7px #000000',
        marginLeft: theme.spacing(1.4),
        fontSize: '16px'
    },
}));
  