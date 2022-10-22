import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// import styles from './account.module.css';
import styled from 'styled-components';


const AbsoluteBox = styled(Box)`
position:absolute;
top:-5%;
left:0%;
z-index:10000;
padding:1rem;
background:${({bg})=>bg};
width:100%;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
box-shadow:1px 1px 13px 5px black;
animation: appear 0.25s ease-in-out;
@keyframes appear {
    from { transform:scale(0);}
    to{ transform:scale(1);}
}
@media screen and (max-width:900px){
    
}
`;

const ServicePopUp = ({obj}) => {
    const theme=useTheme();

  return (
    <AbsoluteBox bg={theme.palette.common.light}>
        <Typography component="h1" variant="body2">
            {obj.desc}
        </Typography>
    </AbsoluteBox>
  )
}

export default ServicePopUp