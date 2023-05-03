import React, { useState } from 'react';
import {
    Grid,
    Typography,
    Pagination,
    Box
  } from "@mui/material";
import ApplicationItem from './ApplicationItem';

const ApplicationList = (props) => {
    const [page, setPage] = useState(1);
    const appPerPage = 6;
    const pageCount = Math.ceil(props.applications?.length / appPerPage);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * appPerPage;
    const selectedApplications = props?.applications?.slice(startIndex, startIndex + appPerPage);

    return (
        <>
            {
                props.loading ? <Typography variant='h6' sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</Typography> :
                props.error ? <Typography variant='h6' color={'red'} sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{props.error}</Typography> :
                props?.applications?.length < 1 ? <Typography variant='h6' sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No applications yet</Typography> :
                <>
                    <Grid container spacing={2}>
                        {selectedApplications?.map((app) => (
                            <ApplicationItem key={app._id} application={app} />
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
};

export default ApplicationList;