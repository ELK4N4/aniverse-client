import { alpha } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { BorderBottom } from '@material-ui/icons';

export default makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(5),
        marginBottom: theme.spacing(3),
    },
    mainBox: {
        marginTop: theme.spacing(-4),
        marginBottom: theme.spacing(5),
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
    metadataBox: {
        display: 'block',
        width: '160px',
        marginTop: theme.spacing(-10),
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            width: '100%',
            justifyItems: 'center',
            alignItems: 'center',
            marginTop: theme.spacing(-15),
        },
        '& > div': {
            margin: 'auto',
        }
    },
    userDetails: {
        '& > div': {
            marginTop: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5),
        }
    },
    userImage: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        border: '8px solid white',
    },
    roleChip: {
        boxShadow: '0px 0px 7px #000000',
        fontSize: '16px',
        marginLeft: theme.spacing(1),
    },
}));
  