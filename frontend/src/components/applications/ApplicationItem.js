import React from 'react'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button
  } from "@mui/material";

const ApplicationItem = (props) => {

  return (
    <>
        <Grid item sm={12}>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" mb={1}>
                        {props.application.job.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" mb={5}>
                        {props.application.job.company.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" >
                        Applied: {new Date(props.application.createdAt).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric"
                        })}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    </>
  )
}

export default ApplicationItem