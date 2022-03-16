import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
    },
    header: {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        marginBottom: theme.spacing(2),
        '& > *': {
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
            marginBottom: theme.spacing(1.5),
            [theme.breakpoints.down('sm')]: {
                marginRight: theme.spacing(.5),
                marginLeft: theme.spacing(.5),
            },
        },
    },
    username: {
        cursor: "pointer",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "pre-line",
    },
    headerControls: {
        marginLeft: 'auto',
        '& > *': {
            marginRight: theme.spacing(.5),
            marginLeft: theme.spacing(.5),
            [theme.breakpoints.down('sm')]: {
                marginRight: theme.spacing(0),
                marginLeft: theme.spacing(0),
                paddingRight: theme.spacing(1),
                paddingLeft: theme.spacing(1),
            },
        }
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        fontSize: theme.spacing(3),
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.main,
        transition: '.1s',
        '&:hover': {
            transform: 'scale(1.15)',
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(4.5),
            height: theme.spacing(4.5),
            fontSize: theme.spacing(2),
        },
    },
}));