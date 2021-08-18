import { fade } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { BorderBottom } from '@material-ui/icons';

export default makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    searchBar: {
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(7),
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        left: theme.spacing(3),
    },
    showcase: {
        background: `linear-gradient(to top right,${theme.palette.primary.main} 0%, #000000 100%)`,
        padding: theme.spacing(2),
        paddingTop: theme.spacing(8.5),
        paddingBottom: theme.spacing(8),
    },
    mainContainer: {
        padding: theme.spacing(0),
        margin: theme.spacing(0),
    },
    titlePaper: {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
        marginBottom: theme.spacing(2),
        borderRadius: 50,
        textAlign: 'center',
    },
    summaryTitle: {
        color: 'white',
        textShadow: '0px 0px 10px #000000',
        fontWeight: 'bold',
    },
    summaryContent: {
        color: 'white'
    },
    detailsContainer: {
        backgroundColor: 'black',
        color: 'white',
        borderBottom: `5px solid ${theme.palette.primary.main}`,
        textAlign: 'center',
        padding: theme.spacing(2),
        fontSize: 20
    },
    episodesTitlePaper: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        width: 'min-content',
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        margin: 'auto',
        marginBottom: theme.spacing(7),
    }
}));
  