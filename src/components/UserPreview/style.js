import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        overflow: "hidden",
    },
    showcase: {
        background: `linear-gradient(to top right,${theme.palette.primary.main} 0%, #000000 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: theme.spacing(8),
        paddingTop: theme.spacing(9),
        paddingBottom: theme.spacing(22),
        borderBottom: `7px solid black`,
    },
    container: {
        marginTop: -theme.spacing(10),
    }
}));