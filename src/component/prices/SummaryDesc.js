import React, { useContext, useEffect, useState } from 'react';
import styles from './price.module.css';
import styled from 'styled-components';
import { Box, Card, CardActions, CardContent, CardMedia, Container, Fab, Grid, Link, Paper, Stack, Typography } from '@mui/material';

const CustomContainer = styled(Container)`
justify-content:center;
align-items:center;
flex-direction:column;
position:absolute;
min-height:15vh;
top:60%;
left:-5%;
font-size:70%;
background-image:url(${({ bg }) => bg});
background-size:100% 100%;
animation: growInto 1.5s ease-in-out;
@keyframes growInto {
    from { opacity:0;transform:scale(0);}
    to { opacity:1;transform:scale(1);}
}
@media screen and (max-width:860px){
    top:40%;
    left:-2%;
}
@media screen and (max-width:600px){
    top:50%;
    left:-5%;
}
`;

const SummaryDesc = ({ url,obj}) => {

    const design = `${url}/design.png`

    

 
    return (
        
         <CustomContainer bg={design} >
            <Paper elevation={10} 
            sx={{ textAlign: "center", width: "100%", margin: "1rem auto", fontFamily: "Roboto",
             padding: "0.5rem",position:"absolute",top:{xs:"-100%",md:"-60%"}
              }}>
                <Stack direction="column">
                    <Typography component="h1" variant="h4" 
                    sx={{fontSize:{xs:"160%",sm:"180%",md:"130%"}
                    
                    }}>
                        
                        {obj.summary}</Typography>

                </Stack>
            </Paper>
        </CustomContainer>
        
    )
}

export default SummaryDesc