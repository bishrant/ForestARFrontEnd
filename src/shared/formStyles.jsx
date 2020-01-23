import { makeStyles } from '@material-ui/core/styles';

const formStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      '& .MuiTextField-root': {
        marginTop: '10px'
      }
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    error: {
      color: 'red',
      width: '100%',
      textAlign: 'center',
      paddingLeft: '20px'
    },
    fullWidth: {
      width: '100%',
      padding: '10px'
    }
  }));
  
export default formStyles;