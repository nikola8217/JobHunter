import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import useStyles from "../../../styles/styles";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getTechnologyById, createTechnology, updateTechnology } from '../../../redux/actions/technologyActions';


const TechnologyForm = () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { loading, technology, error } = useSelector(state => state.technologyDetails);
  const { loading: updLoading, success: updSuccess, error: updError} = useSelector(state => state.technologyUpdate);
  const { loading: createLoading, success: createSuccess, error: createError} = useSelector(state => state.technologyCreate);

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate('/');
    } else {
      if (updSuccess) {
        setSuccessMessage('Technology has been successfully updated');
        setTimeout(() => {
          dispatch({ type: 'TECHNOLOGY_UPDATE_RESET' });
          navigate('/technologies');
        }, 1000);
      } else if (createSuccess) {
        setSuccessMessage('Technology has been successfully added');
        setTimeout(() => {
          dispatch({ type: 'TECHNOLOGY_CREATE_RESET' });
          navigate('/technologies');
        }, 1000);
      } else {
        if (id) {
            if (technology._id !== id) {
                dispatch(getTechnologyById(id));
              } else {
                setName(technology.name);
              }
        }
        
      }
    }
  }, [navigate, dispatch, id, technology, updSuccess, createSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
        dispatch(updateTechnology({ _id: id, name }));
    } else {
        dispatch(createTechnology({name}));
    }
  };

  return (
    <>
      {
        loading ? <Typography variant="h6" textAlign={'center'}>Loading...</Typography> :
        error ? <Typography variant="h6" color={ 'red' }>{error}</Typography> :
        
        <Box className={classes.formBox}>
          <Typography variant="h5" className={classes.formTitle} style={{ marginBottom: '20px' }}>
            {id ? 'Edit technology' : 'Add new technology'}
          </Typography>
          {updLoading || createLoading && <Typography variant="h6" style={{ textAlign: 'center' }}>Loading...</Typography>}
          {updError && <Typography variant="h6" style={{ color: 'red', textAlign: 'center' }}>{updError}</Typography>}
          {createError && <Typography variant="h6" style={{ color: 'red', textAlign: 'center' }}>{createError}</Typography>}
          {successMessage && <Typography variant="h6" style={{ color: 'green', textAlign: 'center' }}>{successMessage}</Typography>}
          <form className={classes.formRoot} onSubmit={handleSubmit}>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
            />
            <Button variant="contained" color={'primary'} type='submit' onSubmit={() => handleSubmit(technology._id)}>Save</Button>
          </form>
        </Box>
      }
    </>
    
  );
}

export default TechnologyForm;
