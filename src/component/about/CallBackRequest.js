import React, { useContext} from 'react'
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import {  Container,  Grid, Stack, Typography } from '@mui/material';

const CustCallbackDiv=styled.div`
margin:auto;
position:absolute;
top:0%;
left:auto
z-index:1000;
width:100%;
animation: callbackAppear 1s ease-in-out;

@keyframes callbackAppear {
    from{opacity:0;}
    to{opacity:1;}
}
@media screen and (max-width:600px){
    margin:auto;
}
`;
const CallBackRequest = () => {
    const theme=useTheme();
    const {callbackQuoteRequest,callBackConfirmed}=useContext(GeneralContext);
    const callBackRequest=callBackConfirmed ? callbackQuoteRequest:null;
  return (
    <Container maxWidth="lg"
     sx={{position:"relative",display:"flex",justifyContent:"center",alignItems:"center",margin:{sm:"1rem auto",xs:"1rem auto"},marginBottom:{sm:"4rem",xs:"15rem"},
     minHeight:"10vh"
    }}
     >
         <CustCallbackDiv>
           
           {callBackRequest && <Stack direction="column" sx={{background:theme.palette.common.light,padding:"0.5rem"}}>
           <Typography component="h1" variant="h5" >Your request has been sent. We will contact you ASAP! </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3} sx={{margin:"0.5rem auto",}}>
                        <Typography component="div" variant="body2">
                            <div>email:{callBackRequest.email} </div>
                            <div>cell:{callBackRequest.cell}</div>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography component="div" variant="body2">
                            <div>full name:{callBackRequest.fullName}</div>
                            <div>Company Name:{callBackRequest.coName}</div>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography component="div" variant="body2">
                            <div>webSite:{callBackRequest.coSite}</div>
                            <div>email promotion:{callBackRequest.promotion}</div>
                            
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography component="div" variant="body2">
                            <div>Request:{callBackRequest.content}</div>
                        </Typography>
                    </Grid>
                    
                </Grid>
           </Stack>}
            </CustCallbackDiv>
    </Container>
  )
}

export default CallBackRequest