import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    [theme.breakpoints.up('sm')]: {
      height: `calc(100vh - ${theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight}px)`,
    },
  }
}));