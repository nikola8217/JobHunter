import React from 'react'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button
  } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const JobItem = (props) => {

  const navigate = useNavigate();

  const handleNav = (id) => {
    navigate(`/jobs/${id}`);
  };

  return (
    <>
        <Grid item lg={12}>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h4" mb={1}>
                        {props.job.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" mb={5}>
                        {props.job.company.name}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => handleNav(props.job._id)}>
                        See More
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    </>
  )
}

export default JobItem