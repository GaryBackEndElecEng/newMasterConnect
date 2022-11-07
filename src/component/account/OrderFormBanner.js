import React, { useContext, useEffect, useRef,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styled from 'styled-components';
import styles from './account.module.css'
import { Box, Typography, } from '@mui/material';
import {useTheme} from '@mui/material/styles';
import { Container,Stack,Fab } from '@mui/material';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';

const MainCoverPage=styled.div`
margin:auto;
display:flex;
justify-content:center;
alignItems:"center;
flex-direction:"column;
background-image:url(${({bg_image})=>bg_image});
background-size:100% 100%;
min-height:30vh;

`;

const OrderFormBanner = () => {
    const theme=useTheme();
    const navigate=useNavigate();
    const {setChangePage}=useContext(GeneralContext)
    const coverImage="https://new-master.s3.ca-central-1.amazonaws.com/static/images/orderForm.png";
    const handleNavigate =()=>{
        navigate("/MyAccount/orderform",setChangePage(true))
    }
  return (
    <MainCoverPage
    bg_image={coverImage}
    >
        <Container maxWidth="xs"
        sx={{margin:"auto",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}
        >
            <Stack direction={{xs:"column",sm:"column",md:"column"}}
            sx={{margin:"1rem auto",textAlign:"center",backgroundColor:{xs:theme.palette.common.blueFade,md:theme.palette.common.lighter},padding:"1rem"}}
            >
                <Typography component="h1" variant="h5" sx={{margin:"1rem auto"}}> Check our progress fill in the missing stuff</Typography>
                <Fab variant="extended" color="secondary" size="large" onClick={()=>handleNavigate()}>
                    orderform/order list <CallMissedOutgoingIcon sx={{color:"red",ml:1}}/>
                </Fab>

            </Stack>
        </Container>

    </MainCoverPage>
  )
}

export default OrderFormBanner