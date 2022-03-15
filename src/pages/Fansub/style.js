import { alpha } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        '&>*': {
            margin: 15
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
        marginTop: theme.spacing(1.5),
    },
    followingButton: {
        boxShadow: '0px 0px 20px #000000',
        backgroundColor: 'white',
        marginTop: theme.spacing(1.5),
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
        transition: '.5s',
    },
    memberPaper: {
        cursor: 'pointer',
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
        padding: theme.spacing(1),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        width: theme.spacing(24),
        height: theme.spacing(31),
        transition: '.5s',
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.35),
            boxShadow: '0px 0px 50px black',
        },
        '&:hover $userAvatar': {
            transform: 'scale(1.05)',
        },
    },
    memberText: {
        padding: theme.spacing(.5),
        width: '100%',
        fontWeight: 'bold',
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }
}));