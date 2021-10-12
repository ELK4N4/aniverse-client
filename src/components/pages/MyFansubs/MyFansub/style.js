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
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
    },
    title: {
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(0.5)
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        left: theme.spacing(3),
    },
    panelTitle: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        color: 'white'
    },
    panelPaper: {
        backgroundColor: theme.palette.primary.main,
        marginTop: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        overflow: 'hidden'
    },
    paper: {
        padding: theme.spacing(2),
        overflow: 'hidden'
    },
    chip: {
        margin: theme.spacing(0.5),
    },

    searchPaper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        borderRadius: 100,
    },
    input: {
        marginLeft: theme.spacing(3),
        fontSize: '15px',
        flex: 1,
    },
    iconButton: {
        padding: 17,
    },
    searchIcon:{
        fontSize: '15px',
    },
    permissionForm: {
        display: 'flex',
        marginBottom: theme.spacing(2),
    },
    permissionButton: {
        marginLeft: theme.spacing(1),
    },
    permissionControl: {
        flexGrow: 1,
        borderRadius: theme.shape.borderRadius
    },
    textMargin: {
        marginLeft: 20,
        transition: '.3s',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 1,
        },
    },
    listItem: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        borderRadius: 30,
        padding: theme.spacing(2),
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
                marginLeft: 20,
            },
            [theme.breakpoints.down('xs')]: {
                marginLeft: 1,
            },
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    },

    sideButtons: {
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

    moreButton: {
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