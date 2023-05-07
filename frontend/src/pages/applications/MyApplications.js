import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listApplication } from '../../redux/actions/applicationActions';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ApplicationList from '../../components/applications/ApplicationList';

const MyApplications = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state.applicationList);
  const { userInfo } = useSelector(state => state.userLogin);
  // const { userInfo: register } = useSelector(state => state.userRegister);
  const [id, setId] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else if (userInfo && userInfo.isAdmin) {
      navigate('/users');
    } else {
      dispatch(listApplication(userInfo._id));
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <>
      <Typography variant='h5' sx={{ marginBottom: '50px' }}>
          My Applications
      </Typography>
      <ApplicationList loading={loading} applications={data} error={error} />
    </>
  )
}

export default MyApplications