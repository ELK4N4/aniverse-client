import { alpha } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    searchBar: {
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(7),
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        left: theme.spacing(3),
    },
    showcase: {
        background: `linear-gradient(to top right,${theme.palette.primary.main} 0%, #000000 100%)`,
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(7),
        borderBottom: `7px solid black`,
    },
    pageTitle: {
        color: 'white',
        textShadow: '0px 0px 20px #000000',
        fontWeight: 'bold',
    },
    pageContent: {
        marginTop: -theme.spacing(13)
    },
}));
  