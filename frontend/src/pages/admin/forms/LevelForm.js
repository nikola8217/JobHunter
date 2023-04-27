import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import useStyles from "../../../styles/styles";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getLevelById, createLevel, updateLevel } from '../../../redux/actions/levelActions';


const LevelForm = () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { loading, level, error } = useSelector(state => state.levelDetails);
  const { loading: updLoading, success: updSuccess, error: updError} = useSelector(state => state.levelUpdate);
  const { loading: createLoading, success: createSuccess, error: createError} = useSelector(state => state.levelCreate);

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate('/');
    } else {
      if (updSuccess) {
        setSuccessMessage('Level has been successfully updated');
        setTimeout(() => {
          dispatch({ type: 'LEVEL_UPDATE_RESET' });
          navigate('/levels');
        }, 1000);
      } else if (createSuccess) {
        setSuccessMessage('Level has been successfully added');
        setTimeout(() => {
          dispatch({ type: 'LEVEL_CREATE_RESET' });
          navigate('/levels');
        }, 1000);
      } else {
        if (id) {
            if (level._id !== id) {
                dispatch(getLevelById(id));
              } else {
                setName(level.name);
              }
        }
        
      }
    }
  }, [navigate, dispatch, id, level, updSuccess, createSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
        dispatch(updateLevel({ _id: id, name }));
    } else {
        dispatch(createLevel({name}));
    }
  };

  return (
    <>
      {
        loading ? <Typography variant="h6" textAlign={'center'}>Loading...</Typography> :
        error ? <Typography variant="h6" color={ 'red' }>{error}</Typography> :
        
        <Box className={classes.formBox}>
          <Typography variant="h5" className={classes.formTitle} style={{ marginBottom: '20px' }}>
            {id ? 'Edit level' : 'Add new level'}
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
            <Button variant="contained" color={'primary'} type='submit' onSubmit={() => handleSubmit(level._id)}>Save</Button>
          </form>
        </Box>
      }
    </>
    
  );
}

export default LevelForm;
