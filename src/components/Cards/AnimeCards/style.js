import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        overflow: 'auto'
    },
    card: {
        margin: theme.spacing(2.5),
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(1.5),
        },
        transition: '.3s',
        '&:hover': {
            transform: `scale(${1.05})`,
        },
        '&:active': {
            transform: `scale(${.95})`,
        }
    }
}));