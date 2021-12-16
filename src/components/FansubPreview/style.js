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
        }
    },
    headerControls: {
        marginLeft: 'auto',
        '& > *': {
            marginRight: theme.spacing(.5),
            marginLeft: theme.spacing(.5),
        }
    },
    logo: {
        width: theme.spacing(24),
        height: theme.spacing(24),
        boxShadow: '0 0 15px 5px rgba(0, 0, 0, 0.2)',
        borderRadius: theme.shape.borderRadius
    },
    showcase: {
        background: `linear-gradient(to top right,${theme.palette.primary.main} 0%, #000000 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        paddingTop: theme.spacing(5),
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(5),
        '& *':{
            marginRight: theme.spacing(.5),
            marginLeft: theme.spacing(.5),
        }
    },
    fansubName: {
        color: 'white',
        textShadow: '0px 0px 20px #000000',
    }
}));