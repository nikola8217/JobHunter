import React, { useState, useEffect } from 'react';
import { TextField, Checkbox, FormControlLabel, Button, Box, Typography } from '@material-ui/core';
import useStyles from "../../../styles/styles";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../../../redux/actions/userActions';


const UsersForm = () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { loading, user, error } = useSelector(state => state.userDetails);
  const { loading: updLoading, success: updSuccess, error: updError} = useSelector(state => state.userUpdate);

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate('/');
    } else {
      if (updSuccess) {
        setSuccessMessage('User has been successfully updated');
        setTimeout(() => {
          dispatch({ type: 'USER_UPDATE_RESET' });
          navigate('/users');
        }, 1000);
      } else {
        if (user._id !== id) {
          dispatch(getUserById(id));
        } else {
          setName(user.name);
          setEmail(user.email);
          setIsAdmin(user.isAdmin);
        }
      }
    }
  }, [dispatch, id, user, updSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUser({ _id: id, name, email, isAdmin }));
    
  };

  return (
    <>
      {
        loading ? <Typography variant="h6" textAlign={'center'}>Loading...</Typography> :
        error ? <Typography variant="h6" color={ 'red' }>{error}</Typography> :
        
        <Box className={classes.formBox}>
          <Typography variant="h5" className={classes.formTitle} style={{ marginBottom: '20px' }}>
            Edit user
          </Typography>
          {updLoading && <Typography variant="h6" style={{ textAlign: 'center' }}>Loading...</Typography>}
          {updError && <Typography variant="h6" style={{ color: 'red', textAlign: 'center' }}>{updError}</Typography>}
          {successMessage && <Typography variant="h6" style={{ color: 'green', textAlign: 'center' }}>{successMessage}</Typography>}
          <form className={classes.formRoot} onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  color={'primary'}
                />
              }
              label="Is admin"
            />
            <Button variant="contained" color={'primary'} type='submit' onSubmit={() => handleSubmit(user._id)}>Save</Button>
          </form>
        </Box>
      }
    </>
    
  );
}

export default UsersForm;
