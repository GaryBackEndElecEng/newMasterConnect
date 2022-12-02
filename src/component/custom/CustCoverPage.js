import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import {useTheme} from '@mui/material/styles';
import {Container, Stack,Typography} from '@mui/material';
import styles from './custom.module.css';

const MainCover = styled.div`
margin:auto 0;
margin-top:0px;
width:100vw;
background-image:url(${({bgImage})=>bgImage});
background-size:100% 100%;
height:40vh;
position:relative;
animation: appearIn 1s ease-in-out;
@keyframes appearIn {
  from {opacity:0;}
  to {opacity:1;}
}
@media screen and (max-width:900px){
margin-top:0px;
}
@media screen and (max-width:780px){
margin-top:0px;
}
@media screen and (max-width:600px){
margin-top:0px;
}
`;
const CustCoverPage = ({staticImage}) => {
  const theme=useTheme();
  const bgImage =`${staticImage}/customPage.png`;
  return (
    <MainCover
    bgImage={bgImage}
    >
      <Container maxWidth="md"
      sx={{marginTop:{md:"5rem",sm:"6rem",xs:"6rem"},color:"white"}}
      >
     <Stack direction="column" spacing={{xs:0,sm:1}}
     sx={{justifyContent:"center",alignItems:"center",margin:"1rem auto",
    background:theme.palette.common.fadeCharcoal
    }}
     >
      <Typography component="h1" variant="h3"
      sx={{fontSize:{xs:"200%",sm:"300%",md:"300%"}}}
      > 
      Custom templates
      </Typography>
     </Stack>
     <Stack direction="column" spacing={{xs:0,sm:1}}
  sx={{margin:"1rem auto",background:theme.palette.common.fadeCharcoal}}
     >
      <Typography component="h1" variant="h5" className={styles.transitionIn}> Select from the list below, then press next</Typography>
     </Stack>
     </Container>

    </MainCover>
  )
}

export default CustCoverPage