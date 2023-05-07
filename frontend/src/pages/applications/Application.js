import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import useStyles from '../../styles/styles';
import { Typography, Box, Button, TextField, InputLabel, OutlinedInput } from '@mui/material';
import { getUserById } from '../../redux/actions/userActions';
import { getJobById } from '../../redux/actions/jobActions';
import { apply } from '../../redux/actions/applicationActions';


const Application = () => {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.userLogin);
    // const { userInfo: register } = useSelector(state => state.userRegister);
    const { loading, user, error } = useSelector(state => state.userDetails);
    const { job } = useSelector(state => state.jobDetails);
    const { loading: applyLoading, success } = useSelector(state => state.applicationCreate);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else if (userInfo && userInfo.isAdmin) {
            navigate('/users');
        } else {
            if (success) {
                setSuccessMessage('You successfully applied for this job!');
                setTimeout(() => {
                    dispatch({ type: 'APPLICATION_CREATE_RESET' });
                    navigate('/applications');
                }, 1000);
            } else {
                dispatch(getJobById(id));
                dispatch(getUserById(userInfo._id));
                setName(userInfo.name);
                setEmail(userInfo.email);
            }
            
        }
    }, [userInfo, id, success]);

    const handleFileChange = (e) => {
        setFile(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file) {
            setErrorMessage('Please insert your resume!');
            return;
        }

        dispatch(apply({userId: userInfo._id, name, email, job: id}));
        setErrorMessage('');
        
    };

  return (
    <>
      {
        loading ? <Typography variant="h6" textAlign={'center'}>Loading...</Typography> :
        error ? <Typography variant="h6" color={ 'red' }>{error}</Typography> :
        
        <Box className={classes.formBox}>
          <Typography variant="h5" className={classes.formTitle} style={{ marginBottom: '20px' }}>
            Apply for {job?.name} at {job?.company?.name}
          </Typography>
          {applyLoading && <Typography variant="h6" style={{ textAlign: 'center' }}>Loading...</Typography>}
          {errorMessage && <Typography variant="h6" style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</Typography>}
          {successMessage && <Typography variant="h6" style={{ color: 'green', textAlign: 'center' }}>{successMessage}</Typography>}
          <form className={classes.formRoot} onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              disabled
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              disabled
              style={{ marginBottom: '50px' }}
            />
           <InputLabel htmlFor="file-input" style={{ marginBottom: '20px' }}>Add your resume</InputLabel>
            <OutlinedInput
              id="file-input"
              type="file"
              onChange={handleFileChange}
              inputProps={{ accept: 'application/pdf,.doc,.docx' }}
              style={{ width: '100%', marginBottom: '30px' }}
            />
            
            <Button variant="contained" color={'primary'} type='submit'>Apply</Button>
          </form>
        </Box>
      }
    </>
  )
}

export default Application