import { fade } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        width: theme.spacing(24),
        height: theme.spacing(24),
        boxShadow: '0 0 15px 5px rgba(0, 0, 0, 0.2)',
        borderRadius: theme.shape.borderRadius
    },
    showcase: {
        background: `linear-gradient(to top right,${theme.palette.primary.main} 0%, #000000 100%)`,
        padding: theme.spacing(8),
        paddingTop: theme.spacing(6.5),
        paddingBottom: theme.spacing(6),
        '& *':{
            marginRight: theme.spacing(1.5),
            marginLeft: theme.spacing(1.5),
        }
    },
    fansubName: {
        color: 'white',
        textShadow: '0px 0px 20px #000000',
    },
    followButton: {
        boxShadow: '0px 0px 20px #000000',
    },
    title: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        paddingTop: theme.spacing(3),
        padding: theme.spacing(6),
        overflow: 'hidden'
    },
    userAvatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    memberPaper: {
        cursor: 'pointer',
        backgroundColor: fade(theme.palette.primary.main, 0.15),
        padding: theme.spacing(2),
        width: theme.spacing(30),
        transition: '.2s',
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.main, 0.25),
        }
    },
}));