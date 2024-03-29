import { alpha } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { BorderBottom } from '@material-ui/icons';

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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: theme.spacing(8),
        paddingTop: theme.spacing(9),
        paddingBottom: theme.spacing(17),
        borderBottom: `7px solid black`,
        overflow: 'hidden',
        zIndex: -1,
        position: 'relative'
    },
    containers: {
        '& > *': {
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(5),
        },
    },
    mainContainer: {
        padding: theme.spacing(0),
        margin: theme.spacing(0),
    },
    titlePaper: {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
        marginBottom: theme.spacing(2),
        borderRadius: 50,
        textAlign: 'center',
    },
    animeName: {
        color: 'white',
        textShadow: '0px 0px 20px #000000',
        fontWeight: 'bold',
        animation: `$bla .55s ${theme.transitions.easing.easeInOut}`,
    },

    "@keyframes bla": {
        "0%, 50%": {
            transform: 'translateY(50px)',
            opacity: '0%',
        },
        "100%": {
            transform: 'translate(0)',
            opacity: '100%',
        }
    },

    summaryTitle: {
        color: 'white',
        textShadow: '0px 0px 10px #000000',
        fontWeight: 'bold',
    },
    summaryContent: {
        color: 'white'
    },
    detailsContainer: {
        padding: theme.spacing(3),
        marginTop: -theme.spacing(14),
    },
    detailsTitle: {
        fontWeight: 'bold',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        display: 'block',
        color: theme.palette.primary.main
    },
    episodesBtnsContainer: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    episodesTitlePaper: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        width: 'min-content',
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        margin: 'auto',
        marginBottom: theme.spacing(7),
    },
    commentsTitle: {
        display: 'inline-block',
        fontWeight: 'bold',
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(2),
    }
}));
  