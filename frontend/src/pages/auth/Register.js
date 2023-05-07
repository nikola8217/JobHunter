import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {register} from '../../redux/actions/userActions';
import useStyles from '../../styles/styles';

const Register = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(state => state.userRegister);
  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    } else {
      if (success) {
        setSuccessMessage('You successfully created account! You will be redirected to login page in a second!');
        setTimeout(() => {
            dispatch({ type: 'USER_REGISTER_RESET' });
            navigate('/login');
        }, 1000);
      }
    }
  }, [navigate, userInfo, success]);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(register(name, email, password, passConfirm));

  };

  return (
    <div className={classes.root} style={{ marginBottom: '50px' }}>
      <Typography variant="h5" className={classes.title} sx={{ 
        marginBottom: '30px'
       }}>
        Create your account
      </Typography>
      {loading && <Typography variant='p' mb={3}>Loading...</Typography>}
      {error && <Typography variant='p' mb={3} color={'red'}>{error}</Typography>}
      {successMessage && <Typography variant='p' mb={3} color={'green'} textAlign={'center'}>{successMessage}</Typography>}
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          variant="outlined"
          sx={{ 
            marginBottom: '20px'
           }}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          variant="outlined"
          sx={{ 
            marginBottom: '20px'
           }}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          variant="outlined"
          sx={{ 
            marginBottom: '20px'
          }}
        />
        <TextField
          id="password_confirmation"
          label="Password confirmation"
          type="password"
          value={passConfirm}
          onChange={(event) => setPassConfirm(event.target.value)}
          variant="outlined"
          sx={{ 
            marginBottom: '20px'
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          sx={{ 
            marginBottom: '20px'
          }}
        >
          Register
        </Button>
        <Typography variant='p' sx={{ textAlign: 'center' }}>You already have account? Log in <Link to='/login'style={{ textDecoration: 'none' }}>here</Link>.</Typography>
      </form>
    </div>
  );
};

export default Register;
