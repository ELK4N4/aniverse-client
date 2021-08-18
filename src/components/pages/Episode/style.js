import { fade } from '@material-ui/core/';
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
    watch: {
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden'
    },
    iframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    episodeDetails: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(2),
        padding: theme.spacing(6),
        width: '100%',
        backgroundColor: 'black',
        color: 'white',
        boxShadow: '0px 0px 20px white',
        '& *':{
            display: 'inline-block',
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
        }
    },
    paper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        overflow: 'hidden',
        transition: theme.transitions.create("all", {
            easing: theme.transitions.easing.sharp, 
            duration: theme.transitions.duration.leavingScreen,
        }),
        boxSizing: 'border-box',
    },
    animeTitlePaper: {
        width: 'max-content',
        padding: theme.spacing(0.5),
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
}));
  