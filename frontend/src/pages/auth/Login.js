import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../../redux/actions/userActions';
import useStyles from '../../styles/styles';

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, userInfo, error } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title} sx={{ 
        marginBottom: '50px'
       }}>
        Login to your account
      </Typography>
      {loading && <Typography variant='p' mb={3}>Loading...</Typography>}
      {error && <Typography variant='p' mb={3} color={'red'}>{error}</Typography>}
      <form className={classes.form} onSubmit={handleSubmit}>
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          sx={{ 
            marginBottom: '20px'
          }}
        >
          Login
        </Button>
        <Typography variant='p' sx={{ textAlign: 'center' }}>You don't have account? Register <Link to='/register'style={{ textDecoration: 'none' }}>here</Link>.</Typography>
      </form>
    </div>
  );
};

export default Login;
