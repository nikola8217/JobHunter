import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import useStyles from "../../../styles/styles";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompanyById, createCompany, updateCompany } from '../../../redux/actions/companyActions';


const CompanyForm = () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [about, setAbout] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { loading, company, error } = useSelector(state => state.companyDetails);
  const { loading: updLoading, success: updSuccess, error: updError} = useSelector(state => state.companyUpdate);
  const { loading: createLoading, success: createSuccess, error: createError} = useSelector(state => state.companyCreate);

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate('/');
    } else {
      if (updSuccess) {
        setSuccessMessage('Company has been successfully updated');
        setTimeout(() => {
          dispatch({ type: 'COMPANY_UPDATE_RESET' });
          navigate('/companiesAdmin');
        }, 1000);
      } else if (createSuccess) {
        setSuccessMessage('Company has been successfully added');
        setTimeout(() => {
          dispatch({ type: 'COMPANY_CREATE_RESET' });
          navigate('/companiesAdmin');
        }, 1000);
      } else {
        if (id) {
            if (company._id !== id) {
                dispatch(getCompanyById(id));
              } else {
                setName(company.name);
                setImg(company.img);
                setAddress(company.address);
                setCity(company.city);
                setZip(company.zip);
                setAbout(company.about);
              }
        }
        
      }
    }
  }, [navigate, dispatch, id, company, updSuccess, createSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
        dispatch(updateCompany({ _id: id, name, img, address, city, zip, about }));
    } else {
        dispatch(createCompany({name, img, address, city, zip, about}));
    }
  };

  return (
    <>
      {
        loading ? <Typography variant="h6" textAlign={'center'}>Loading...</Typography> :
        error ? <Typography variant="h6" color={ 'red' }>{error}</Typography> :
        
        <Box className={classes.formBox}>
          <Typography variant="h5" className={classes.formTitle} style={{ marginBottom: '20px' }}>
            {id ? 'Edit company' : 'Add new company'}
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
            <TextField
                label="Image"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                variant="outlined"
            />
            <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
            />
            <TextField
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                variant="outlined"
            />
            <TextField
                label="Zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                variant="outlined"
            />
            <TextField
                label="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                multiline
                rows={10}
                variant="outlined"
            />
            <Button variant="contained" color={'primary'} type='submit' onSubmit={() => handleSubmit(company._id)}>Save</Button>
          </form>
        </Box>
      }
    </>
    
  );
}

export default CompanyForm;
