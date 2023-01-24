import React,{useRef,useEffect} from 'react';

import styles from './video.module.css';
import styled from 'styled-components';
import {  Container, Paper,CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';



const CoverContainer = styled(Container)`
margin:0;
margin-top:-45px;
background-color:black;
width:100vw;
min-height:20vh;
position:relative;
padding:0;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
margin-bottom:2rem;
animation:clearIn 3s ease-in-out;
@keyframes clearIn {
  from {opacity:0;}
  to {opacity:1;}
}
@media screen and (max-width:900px){
  margin-top:-50px;
};

@media screen and (max-width:600px){
  margin-top:-52px;
};

`;

const CoverPage = ({logoVideo,image}) => {
  const MyRef=useRef();
  const theme = useTheme();
  const handlePlay=(e)=>{
    if(!e.currentTarget)return;
    e.currentTarget.play();
  }

  

  return (
    <CoverContainer maxWidth="xl">
      
        <Paper elevation={10} component="div"
          sx={{
            textAlign: "center", marginTop: "3rem", background:"black", color: theme.palette.common.lighter,
          }}>
              <CardMedia
              id={"getThis"}
              component={"video"}
              type={"video/mp4"}
              loop={false}
              playing={"true"}
              autoPlay={true}
              src={logoVideo}
              ref={MyRef}
              poster={image}
              sx={{width:"100%",cursor:"pointer"}}
              onClick={(e)=>handlePlay(e)}
              
              />
          
        </Paper>
       
      
      
    </CoverContainer>
  )
}

export default CoverPage