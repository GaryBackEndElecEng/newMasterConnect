import React from 'react';
import {Stack,Grid,Typography,Card,Avatar} from '@mui/material';

const ProductsServiceDependancies = ({ serviceArr,staticImage }) => {
    const services = (serviceArr.loaded && serviceArr.id !== null) && serviceArr.data ? serviceArr.data : [];
    return (
        <Grid container spacing={{ xs: 0, sm: 1 }}>
            {
                services.map((obj, index) => (
                    <Grid item xs={12} sm={6} key={`${obj.id}-/-${index}`}>
                        <Card elevation={3} sx={{ padding: "0.25rem" }}>
                            <Avatar src={`${staticImage}/${obj.image}`} sx={{ width: "70px", height: "70px" }} />
                            <Typography component="h1" variant="h5" sx={{ margin: "1rem auto" }}>{obj.name}</Typography>
                            <Typography component="h1" variant="body1" sx={{ margin: " auto" }}>{obj.summary}</Typography>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>

    )
}

export default ProductsServiceDependancies