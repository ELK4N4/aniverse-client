import { fade } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const fontSize = 23;

export default makeStyles((theme) => ({
    root: {
        padding: '7px 10px',
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        borderRadius: 100,
    },
    input: {
        marginLeft: theme.spacing(3),
        fontSize: fontSize,
        flex: 1,
    },
    iconButton: {
        padding: 17,
    },
    searchIcon:{
        fontSize: fontSize,
    },
}));
  