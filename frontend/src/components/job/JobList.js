import React, { useState } from 'react';
import {
    Grid,
    Typography,
    Pagination,
    Box
  } from "@mui/material";
  import JobItem from './JobItem';

const JobList = (props) => {
    const [page, setPage] = useState(1);
    const jobsPerPage = 6;
    const pageCount = Math.ceil(props.jobs.length / jobsPerPage);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * jobsPerPage;
    const selectedJobs = props.jobs.slice(startIndex, startIndex + jobsPerPage);

    return (
        <>
            {
                props.loading ? <Typography variant='h6' sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</Typography> :
                props.error ? <Typography variant='h6' color={'red'} sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{props.error}</Typography> :
                props.jobs.length < 1 ? <Typography variant='h6' sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No jobs</Typography> :
                <>
                    <Grid container spacing={2}>
                        {selectedJobs.map((job) => (
                            <JobItem key={job._id} job={job} />
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

export default JobList;