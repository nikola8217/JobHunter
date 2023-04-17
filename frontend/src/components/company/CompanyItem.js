import React from 'react'
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button
  } from "@mui/material";

const CompanyItem = (props) => {
  return (
    <>
        <Grid item xs={12} sm={6} md={4}>
            <Card>
                <CardMedia
                    component="img"
                    height="100%"
                    width="100%"
                    image={props.company.img}
                    alt={props.company.name}
                    sx={{
                      objectFit: 'cover',
                      height: '250px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant="h5" component="h2" mb={2}>
                        {props.company.name}
                    </Typography>
                    <Button variant="contained" color="primary">
                        See More
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    </>
  )
}

export default CompanyItem