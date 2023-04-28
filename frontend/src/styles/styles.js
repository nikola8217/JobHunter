import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(10),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: theme.spacing(3),
    boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
    maxWidth: 400,
    width: '100%',
    height: 'fit-content',
    margin: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    '& > *': {
      width: '100%',
    },
  },
  button: {
    maxWidth: '30%',
    // margin: 'auto',
  },
  tableHeader: {
    backgroundColor: '#1976d2',
  },
  formRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  formBox: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(3),
    maxWidth: 800,
    margin: '0 auto',
    borderRadius: '10px'
  },
  
 
}));

export default useStyles;
