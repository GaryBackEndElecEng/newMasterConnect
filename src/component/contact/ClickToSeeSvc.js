import React,{useEffect,useState} from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Box,Stack,Typography} from  '@mui/material';
import styled from 'styled-components';

const CustBox=styled(Box)`
display:block;
animation: moveLeft 1s ease-in-out;
position:absolute;
top:0%;
left:110%;
font-size:50px;
color:red;

@keyframes moveLeft {
    from { opacity:0;transform:translateX(200%);}
    to { opacity:1;transform:translate(0%);}
}

@media screen and (max-width:600px){
    left:110%;
}
`;


const ClickToSeeSvc = () => {

  return (
    
        <CustBox><VisibilityIcon sx={{fontSize:"100%"}}/></CustBox>
    
  )
}

export default ClickToSeeSvc
