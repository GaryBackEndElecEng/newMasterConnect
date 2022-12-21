import React from 'react';
import {Card,Avatar,Stack,Typography,Grid} from '@mui/material';
import styled from 'styled-components';

const CustGrid=styled(Grid)`
animation:slideDown 1s ease-in-out;
@keyframes slideDown {
from {opacity:0;transform:translateY(-50%);}
to {opacity:1;transform:translateY(0%);}
}
`;

const PostServices = ({postServices,staticImage}) => {
   
  return (
    <CustGrid container spacing={{xs:0,sm:1}}>
    {postServices && postServices.map((service, index) => (
        <Grid item xs={12}  key={`${service.id}-/prods/-${index}`}>
            <Card elevation={3}
                sx={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start",flexDirection:"column" }}
            >
                <Stack direction={{ xs: "column", sm: "row" }} sx={{ margin: "0.5rem auto",alignSelf:"center" }}>
                    <Avatar src={`${staticImage}/${service.image}`} alt="www.master-connect.ca"
                        sx={{ width: "75px", height: "75px" }}
                    />
                    <Typography component="h1" variant="h5">{service.name}</Typography>
                </Stack>
                <Typography component="h1" variant="h6" sx={{margin:"0.5rem auto"}}>summary</Typography>
                <Typography component="h1" variant="body1">{service.summary}</Typography>
                <Typography component="h1" variant="h6" sx={{margin:"0.5rem auto"}}>description</Typography>
                <Typography component="h1" variant="body1">{service.desc}</Typography>
                
            </Card>

        </Grid>
    ))}
    </CustGrid>
  )
}

export default PostServices