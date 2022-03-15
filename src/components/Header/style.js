import { alpha } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    button: {
      color: 'white !important',
      backgroundColor: '#da190b',
      margin: theme.spacing(1),
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      "&.active": {
        background:'#790e06',
      },
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    username: {
      cursor: "pointer",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      display: 'none',
      maxWidth: 200,
      [theme.breakpoints.up('sm')]: {
        maxWidth: 250,
        display: 'block',
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: 350,
        display: 'block',
      },
    },
    title: {
      display: 'block',
      color: 'white',
      fontWeight: 700,
      textDecoration: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    logout: {
      color: 'red'
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    avatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
}));
  