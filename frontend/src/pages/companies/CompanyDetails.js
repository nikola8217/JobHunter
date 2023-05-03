import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCompanyById } from '../../redux/actions/companyActions';
import { Typography, Box } from '@mui/material';
import { listJobs } from '../../redux/actions/jobActions';
import JobList from '../../components/job/JobList';

const CompanyDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, company, error } = useSelector(state => state.companyDetails);
    const { loading: jobLoading, data, error: jobError } = useSelector(state => state.jobList);

    useEffect(() => {
        dispatch(getCompanyById(id));
        dispatch(listJobs(id));
    }, [dispatch, id])

    return (
        <>
            {
                loading ? <Typography variant='h6' sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</Typography> :
                error ? <Typography variant='h6' sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red' }}>{error}</Typography> :
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={company.img} alt={company.name} style={{ widgt: '500px', height: '200px', marginBottom: '50px' }}></img>
                        <Typography variant='h4' sx={{ marginBottom: '10px' }}>{company.name}</Typography>
                        <Typography variant='h6' sx={{ marginBottom: '90px' }}>{company.address}, {company.zip} {company.city}</Typography>
                    </Box>
                    <Typography variant='h4' sx={{ marginBottom: '50px' }}>
                        About us
                    </Typography>
                    <Typography variant='h6' sx={{ marginBottom: '70px' }}>
                        {company.about}
                    </Typography>
                    <Typography variant='h4' sx={{ marginBottom: '50px' }}>
                        Jobs
                    </Typography>
                   <JobList jobs={data} loading={jobLoading} error={jobError} /> 
                </>
                

            }
        </>
    )
}

export default CompanyDetails