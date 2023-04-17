import React, { useState } from 'react';
import {
    Grid,
    Typography,
    Pagination,
    Box
  } from "@mui/material";
import CompanyItem from './CompanyItem';

const CompanyList = (props) => {
    const [page, setPage] = useState(1);
    const companiesPerPage = 6;
    const pageCount = Math.ceil(props.companies.length / companiesPerPage);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * companiesPerPage;
    const selectedCompanies = props.companies.slice(startIndex, startIndex + companiesPerPage);

    return (
        <>
            {
                props.loading ? <Typography variant='h6' sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</Typography> :
                props.error ? <Typography variant='h6' color={'red'} sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{props.error}</Typography> :
                props.companies.length < 1 ? <Typography variant='h6' sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No Companies</Typography> :
                <>
                    <Grid container spacing={2}>
                        {selectedCompanies.map((company) => (
                            <CompanyItem key={company._id} company={company} />
                        ))}
                    </Grid>
                    <Box mt={10} mb={15} display="flex" justifyContent="center">
                        <Pagination
                        count={pageCount}
                        page={page}
                        onChange={handleChange}
                        color="primary"
                        />
                    </Box>
                </>
            
            }
        </>
        
    )
}

export default CompanyList