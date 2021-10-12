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
    listItem: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        borderRadius: 30,
        padding: theme.spacing(2),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&:hover $avatar': {
            transform: 'scale(1.1)',
        },
        '&:hover .text-margin': {
            transition: '.3s',
            margin: 8
        }
    },

    sideButtons: {
        '& > *': {
            backgroundColor: 'white',
            marginRight: theme.spacing(.6),
            marginLeft: theme.spacing(.6),
        }
    },

    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        fontSize: theme.spacing(4),
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.main,
        transition: '.3s',
    }
}));