import React, { useContext, useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import {Container, Typography,  Stack} from '@mui/material';
// import styles from './checkout.module.css';
import styled from 'styled-components';

const CoverMainContainer=styled.div.attrs({className:"container-fluid"})`
width:100vw;
height:60vh;
position:relative;
margin-top:0.5rem;
background-image:url(${({bgImage})=>bgImage});
background-size:100% 100%;
// background:black;

@media screen and (max-width:860px){
    height:40vh;
}
@media screen and (max-width:600px){
    height:30vh;
    margin-top:4rem;
}
`;
const ImageEffect=styled.img.attrs({className:"couple"})`
position:absolute;
width:30%;
height:100%;
left:1%;
top:0%;
opacity:0;
transform:scale(0.1);
animation:getSmall 10s ease-in;
@keyframes getSmall {
    from { transform:scale(1);opacity:1;}
    50%{ transform:scale(0.1);opacity:1}
    to{opacity:0;}
}
@media screen and (max-width:860px){
    width:50%;
}

`;
const CustTypography = styled(Typography)`
margin:2rem auto;
animation: slideIn 2s ease-in;

@keyframes slideIn {
    from {opacity:0;transform:translateX(100%);}
    to {opacity:1;transform:translateX(0%);}
}

`;

const CoverPage = () => {
    const theme=useTheme();
    const navigate=useNavigate();
    const { usersInvoice, userAccount, usersProduct, usersService, setUserAccount, setUsersService, setUsersProduct, setUsersInvoice, setUser_id, user_id, } = useContext(TokenAccessContext);
    const {staticImage}=useContext(GeneralContext);
    const [activate,setActivate]=useState(false);
    const [activate1,setActivate1]=useState(false);
    const coverImg2=`${staticImage}/checkout2.png`;
    const coverImg1=`${staticImage}/checkout1.png`;
    const coverImg3=`${staticImage}/checkout4.png`;
    const coverEffect=`${staticImage}/checkout1Effect.png`;
    
    useEffect(()=>{
        setTimeout(()=>{
            setActivate(true);
        },10000)
        setTimeout(()=>{
            setActivate1(true);
        },5000)
    },[setActivate])


  return (
    <CoverMainContainer bgImage={coverImg1}>
<Container maxWidth="xl"
    sx={{display:"flex",justifyContent:"center",alignItems:"center"}}
    >
        {!activate && <ImageEffect src={coverEffect}  alt="www.master-connect.ca"/>}
        {activate1 && 
        <Stack direction="column">
        <CustTypography component="h1" variant="h4" sx={{fontFamily:"Roboto",marginTop:{sm:"3rem",xs:"0px"},color:{xs:theme.palette.common.light,md:theme.palette.common.light}}}>
            Please choose, below, so we can get started on your New site.
            </CustTypography>
            <Typography component="h1" variant="h3" sx={{fontFamily:"Roboto",marginTop:{xs:"0px",sm:"2rem"},color:{xs:theme.palette.common.light,md:theme.palette.common.light}}}>which option you would like?</Typography>
            </Stack>
            }
        </Container>
    </CoverMainContainer>
    
  )
}

export default CoverPage