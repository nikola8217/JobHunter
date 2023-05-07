import React from 'react'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button
  } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { checkApplication } from '../../redux/actions/applicationActions';
import { useDispatch, useSelector } from 'react-redux';

const JobItem = (props) => {

  const { userInfo } = useSelector(state => state.userLogin);
  // const { userInfo: register } = useSelector(state => state.userRegister);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNav = (id) => {
    if (userInfo) {
      dispatch(checkApplication(userInfo._id, id));
    }
    navigate(`/jobs/${id}`);
  };

  return (
    <>
        <Grid item sm={12}>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" mb={1}>
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