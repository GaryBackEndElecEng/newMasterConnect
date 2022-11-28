import React,{useContext,useState,useEffect} from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {Stack,Typography,Container, Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import styled from 'styled-components';
import styles from './about.module.css';

const MyAccountContainer = styled(Container)`
margin: 1rem auto;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
background:${({bg})=>bg};
animation: appearIn 1.25s ease-in-out;
@keyframes appearIn {
    from {opacity:0;}
    to {opacity:1;}
}
`;
const ImageContainer= styled.img`
width:50%;
@media screen and (max-width:900px){
    width:100%;
}
@media screen and (max-width:600px){
    width:100%;
}

`;
const MyAccountDesc = () => {
    const theme=useTheme();
    const {staticImage,myAccount}=useContext(GeneralContext);
    const myAccountPic=`${staticImage}/myAccount.png`;
    const myAccountPic2=`${staticImage}/myAccount2.png`;
  return (
    <MyAccountContainer maxWidth="xl" bg={theme.palette.common.lighter} sx={{position:"relative"}}>
        <Typography component="h1" variant="h1" 
        sx={{textAlign:"center",fontSize:{xs:"200%"}}}
        >
            {myAccount.loaded && myAccount.data[0].title}
        </Typography>
        <Stack direction={{xs:"column",md:"row"}} spacing={0}
        sx={{margin:"1rem 0",}}
        >
            
            <ImageContainer src={myAccountPic} alt="www.master-connect.ca" />
            <ImageContainer src={myAccountPic2} alt="www.master-connect.ca" />
        </Stack>
        <Stack direction="column">
            <Box>
            <Typography component="h1" variant="h3" sx={{margin:"1rem auto",textAlign:"center"}}>What We Offer</Typography>
            <Typography component="h1" variant="h6">{myAccount.loaded && myAccount.data[0].content}</Typography>
            </Box>
            <Box>
            <Typography component="h1" variant="h3" sx={{textAlign:"center"}}>Specifics</Typography>
            <Typography component="h1" variant="h6">{myAccount.loaded && myAccount.data[0].content1}</Typography>
            </Box>
            <Box>
            <Typography component="h1" variant="h3" sx={{textAlign:"center"}}>Order List Form</Typography>
            <Typography component="h1" variant="h6">{myAccount.loaded && myAccount.data[0].content2}</Typography>
            </Box>
            <Box>
            <Typography component="h1" variant="h3" sx={{textAlign:"center"}}>Consult Page</Typography>
            <Typography component="h1" variant="h6">{myAccount.loaded && myAccount.data[0].content3}</Typography>
            </Box>
        </Stack>
    </MyAccountContainer>
  )
}

export default MyAccountDesc