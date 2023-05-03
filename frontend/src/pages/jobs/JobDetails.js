import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById } from '../../redux/actions/jobActions';
import { Typography, Box, Button } from '@mui/material';

const JobDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, job, error } = useSelector(state => state.jobDetails)

    useEffect(() => {
        dispatch(getJobById(id));
    }, [dispatch, id]);

    const handleNavigate = () => {
        navigate(`/application/${id}`);
    };

    return (
        <>
            {
                loading ? <Typography variant='h6' sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</Typography> :
                error ? <Typography variant='h6' sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red' }}>{error}</Typography> :
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={job?.company?.img} alt={job?.company?.name} style={{ widgt: '500px', height: '200px', marginBottom: '50px' }}></img>
                        <Typography variant='h4' sx={{ marginBottom: '10px' }}>{job?.company?.name}</Typography>
                        <Typography variant='h6' sx={{ marginBottom: '90px' }}>{job?.company?.address}, {job?.company?.zip} {job?.company?.city}</Typography>
                    </Box>
                    <Typography variant='h4' sx={{ marginBottom: '50px' }}>
                        Job description
                    </Typography>
                    <Typography variant='h6' sx={{ marginBottom: '50px' }}>
                        {job?.about}
                    </Typography>
                    <Typography variant='h4' sx={{ marginBottom: '50px' }}>
                        Requirements
                    </Typography>
                    <Typography variant='h6' sx={{ marginBottom: '90px' }}>
                        {job?.requirements}
                    </Typography>
                    <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '50px' }}>
                        <Button variant='contained' color='primary' onClick={() => handleNavigate()}>Apply</Button>
                    </Box>
                    
                </>
                

            }
        </>
    )
};

export default JobDetails;