import { alpha } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    listItem: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        borderRadius: 30,
        padding: theme.spacing(2),
        background: `linear-gradient(to left,${theme.palette.primary.main} 30%, #000000 90%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        boxShadow: '0px 0px 7px #000000',
        transition: '.3s',
        '&:hover': {
            boxShadow: '0px 0px 0px #000000',
        },
        '&:hover $avatar': {
            transform: 'scale(1.1)',
        },
        '&:hover $textMargin': {
            [theme.breakpoints.down('xl')]: {
                marginLeft: 40,
            },
            [theme.breakpoints.down('md')]: {
                marginLeft: 40,
            },
            [theme.breakpoints.down('sm')]: {
                marginLeft: 30,
            },
            [theme.breakpoints.down('xs')]: {
                marginLeft: 0,
            },
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    },
    textMargin: {
        marginLeft: 20,
        transition: '.3s',
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
        },
    },
    controls: {
        display: 'none',
        '& > *': {
            backgroundColor: 'white',
            marginRight: theme.spacing(.6),
            marginLeft: theme.spacing(.6),
        },
        [theme.breakpoints.up('md')]: {
            display: 'block',
        },
    },
    options: {
        display: 'none',
        '& > *': {
            backgroundColor: 'white',
            marginRight: theme.spacing(.6),
            marginLeft: theme.spacing(.6),
            [theme.breakpoints.down('xs')]: {
                padding: theme.spacing(.6),
            },
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },

    avatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        fontSize: theme.spacing(5),
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.main,
        transition: '.3s',
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(8),
            height: theme.spacing(8),
            fontSize: theme.spacing(8),
        },
    }
}));