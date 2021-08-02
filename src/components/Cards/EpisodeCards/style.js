import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%'
    },
    card: {
        transition: '.3s',
        '&:hover': {
            transform: `scale(${1.05})`,
        },
        '&:active': {
            transform: `scale(${.95})`,
        }
    }
}));