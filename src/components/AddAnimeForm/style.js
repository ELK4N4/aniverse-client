import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      padding: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
      transition: theme.transitions.create("all", {
          easing: theme.transitions.easing.sharp, 
          duration: theme.transitions.duration.leavingScreen,
      })
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));