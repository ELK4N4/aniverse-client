import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        overflow: 'hidden'
    },
    header: {
        display: 'grid',
        gridTemplateAreas: `
            'right center left'
            'bottom bottom bottom'
        `,
        gridTemplateColumns: '30% 1fr 30%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: theme.spacing(1.5),
    },
  }));