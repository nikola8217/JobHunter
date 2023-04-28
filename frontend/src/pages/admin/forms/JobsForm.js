import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import useStyles from "../../../styles/styles";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById, createJob, updateJob } from '../../../redux/actions/jobActions';
import { listCompanies } from '../../../redux/actions/companyActions';
import { listTechnologies } from '../../../redux/actions/technologyActions';
import { listLevels } from '../../../redux/actions/levelActions';

const JobsForm = () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [technology, setTechnology] = useState('');
  const [level, setLevel] = useState('');
  const [about, setAbout] = useState('');
  const [requirements, setRequirements] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { loading, job, error } = useSelector(state => state.jobDetails);
  const { loading: updLoading, success: updSuccess, error: updError} = useSelector(state => state.jobUpdate);
  const { loading: createLoading, success: createSuccess, error: createError} = useSelector(state => state.jobCreate);
  const { data: companies } = useSelector(state => state.companyList);
  const { data: technologies } = useSelector(state => state.technologyList);
  const { data: levels } = useSelector(state => state.levelList);

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate('/');
    } else {
      if (updSuccess) {
        setSuccessMessage('Job has been successfully updated');
        setTimeout(() => {
          dispatch({ type: 'JOB_UPDATE_RESET' });
          navigate('/jobsAdmin');
        }, 1000);
      } else if (createSuccess) {
        setSuccessMessage('Job has been successfully added');
        setTimeout(() => {
          dispatch({ type: 'JOB_CREATE_RESET' });
          navigate('/jobsAdmin');
        }, 1000);
      } else {
        dispatch(listCompanies());
        dispatch(listTechnologies());
        dispatch(listLevels());
        if (id) {
            if (job._id !== id) {
                dispatch(getJobById(id));
              } else {
                setName(job.name);
                setCompany(job.company._id);
                setTechnology(job.technology._id);
                setLevel(job.level._id);
                setAbout(job.about);
                setRequirements(job.requirements)
              }
        }
        
      }
    }
  }, [navigate, dispatch, id, job, updSuccess, createSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
        dispatch(updateJob({ _id: id, name, company, technology, level, about, requirements }));
    } else {
        dispatch(createJob({name, company, technology, level, about, requirements}));
    }
  };

  return (
    <>
      {
        loading ? <Typography variant="h6" textAlign={'center'}>Loading...</Typography> :
        error ? <Typography variant="h6" color={ 'red' }>{error}</Typography> :
        
        <Box className={classes.formBox}>
          <Typography variant="h5" className={classes.formTitle} style={{ marginBottom: '20px' }}>
            {id ? 'Edit job' : 'Add new job'}
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
                style={{ marginBottom: '15px' }}
            />
            <Select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              variant="outlined"
              style={{ width: '100%', marginBottom: '15px' }}
              displayEmpty
            >
              <MenuItem value="">
                Select company
              </MenuItem>
              {
                companies.map((company) => {
                  return <MenuItem value={company._id}>{company.name}</MenuItem>
                })
              }
            </Select>
            <Select
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
              variant="outlined"
              style={{ width: '100%', marginBottom: '15px' }}
              displayEmpty
            >
              <MenuItem value="">
                Select technology
              </MenuItem>
              {
                technologies.map((technology) => {
                  return <MenuItem value={technology._id}>{technology.name}</MenuItem>
                })
              }
            </Select>
            <Select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              variant="outlined"
              style={{ width: '100%', marginBottom: '15px' }}
              displayEmpty
            >
              <MenuItem value="">
                Select level
              </MenuItem>
              {
                levels.map((level) => {
                  return <MenuItem value={level._id}>{level.name}</MenuItem>
                })
              }
            </Select>
            <TextField
                label="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                multiline
                rows={10}
                variant="outlined"
            />
            <TextField
                label="Requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                multiline
                rows={10}
                variant="outlined"
            />
            <Button variant="contained" color={'primary'} type='submit' onSubmit={() => handleSubmit(job._id)}>Save</Button>
          </form>
        </Box>
      }
    </>
    
  );
}

export default JobsForm;
