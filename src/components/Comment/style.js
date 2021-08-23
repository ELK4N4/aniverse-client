import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
    },
    header: {
        borderBottom: `3px solid ${theme.palette.primary.main}`,
        marginBottom: theme.spacing(2),
        '& > *': {
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
            marginBottom: theme.spacing(1.5),
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
        }
    },
}));