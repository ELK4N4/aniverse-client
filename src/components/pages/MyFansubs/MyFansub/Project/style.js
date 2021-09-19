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
    title: {
        padding: theme.spacing(2),
        width: '100%'
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        left: theme.spacing(3),
    },
    paper: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(2),
        overflow: 'hidden'
    },
    episodeAvatar: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
    }
}));