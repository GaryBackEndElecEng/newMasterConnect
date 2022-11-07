import React, { useContext, useEffect, useRef,useState } from 'react';
import styled from 'styled-components';
import styles from './userOrderList.module.css'
import { Box, Stack, Typography, } from '@mui/material';
import {useTheme} from '@mui/material/styles';
import { Container } from '@mui/system';

const MainCoverPage=styled.div`
margin:auto;
display:flex;
justify-content:center;
alignItems:center;
flex-direction:"column;
background-image:url(${({bg_image})=>bg_image});
background-size:100% 100%;
min-height:36vh;
width:100vw;
// animation:appearIN 1.5s ease-in-out;
// @keyframes appearIN {
//     from {opacity:0;}
//     to {opacity:1;}
// }
`;
const CoverPage = () => {
    const theme=useTheme();
    const coverImage="https://new-master.s3.ca-central-1.amazonaws.com/static/images/orderForm.png";
  return (
    <MainCoverPage
    bg_image={coverImage}
    >
        <Stack sx={{margin:"auto",backgroundColor:{xs:theme.palette.common.blueFade},padding:"1rem"}} direction="column">
        <Typography component="h1" variant="h3" sx={{width:{xs:"80%",sm:"70%",md:"100%"}}}>progress Report</Typography>
        <Typography component="h1" variant="h6" sx={{width:{xs:"80%",sm:"70%",md:"100%"}}}>checks means the tasks are complete</Typography>
        </Stack>

    </MainCoverPage>
  )
}

export default CoverPage