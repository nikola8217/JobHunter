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
}));

export default useStyles;
