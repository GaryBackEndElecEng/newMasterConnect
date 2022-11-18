import React, { useContext, } from 'react'
import { GeneralContext } from '../../context/GeneralContextProvider';
import styled from 'styled-components';
import {  Typography, Grid, Container, Paper } from '@mui/material';



const SpecialContainer=styled(Container)`
animation:showContainer 1.5s ease-in-out;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
@keyframes showContainer{
    from{ opacity:0;transform:translateX(-20%)};
    to{ opacity:1;transform:translateX(-%)};
}
`;


const ServiceList = ({ourServices}) => {
  const arrContent2=ourServices.loaded ? ourServices.data:null;
 
  return (
<SpecialContainer maxWidth={'xl'} sx={{margin:"2rem auto"}}>
    <Grid container spacing={0} sx={{}}>
    {arrContent2 && arrContent2.map((obj,index) => (
        <Grid key={`${obj.id}-${index}`} item xs={12} sm={6} md={4}
          sx={{
            margin:"auto ",padding:"0.5rem"
            
          }}
        >
          <Paper elevation={3} component="div" sx={{
            margin: "auto", display: "flex", justifyContent: "flex-start", alignItems: "center",
            flexDirection: "column", padding: "0.5rem"
          }}
          >
            <Typography component="h1" variant="h3"
              sx={{ fontFamily: "Roboto",fontSize:{xs:"30px",sm:"30px"} }}
            >
              {obj.title} <span style={{ color: "red" }}>{obj.icon}</span>
            </Typography>
            <Typography component="h1" variant="h6"
              sx={{ padding: "auto 1rem" }}>{obj.content}</Typography>
          </Paper>

        </Grid>
      ))
      }
      </Grid>
      </SpecialContainer>
  )
}

export default ServiceList