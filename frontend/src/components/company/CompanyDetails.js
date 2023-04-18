import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCompanyById } from '../../redux/actions/companyActions';
import { Typography, Box } from '@mui/material';

const CompanyDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, company, error } = useSelector(state => state.companyDetails)

    useEffect(() => {
        dispatch(getCompanyById(id));
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
                    <Typography variant='h6'>
                        {company.about}
                    </Typography>
                </>
                

            }
        </>
    )
}

export default CompanyDetails