import React, { useContext, useEffect, useState, } from 'react';
// import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import {   Typography, } from '@mui/material';
import styled from 'styled-components';
import styles from './article.module.css';


const MainTopCoverPage = styled.div.attrs({ className: "container-fluid" })`
width:90%;
margin: auto;
position:relative;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
background-image:url(${({ bgImage }) => bgImage});
background-size:100% 100%;
min-height:70vh;
margin-bottom:2rem;
box-shadow:1px 1px 10px 5px whitesmoke;
animation:appear 2.5s ease-in-out;
@keyframes appear{
  from {opacity:0;transform: rotate(30deg);box-shadow:1px 1px 1px 5px whitesmoke;}
  to {opacity:1;box-shadow:1px 1px 10px 5px whitesmoke;}
}
@media screen and (max-width:900px){
    margin-top:0px;
    min-height:50vh;
}
@media screen and (max-width:600px){
    margin-top:-5px;
    min-height:40vh;
}
`;

const TopCoverPage = () => {
  const theme=useTheme();
    const {staticImage} = useContext(GeneralContext);
    const bgImage=`${staticImage}/Memories.png`;
    const logo=`${staticImage}/logo.png`;
    const [activate,setActivate]=useState();

    useEffect(()=>{
      setTimeout(()=>{
        setActivate(true)
      },2000)
    },[setActivate])
  return (
    <MainTopCoverPage
    bgImage={bgImage}
    >
        <Typography component="h1" variant={"h3"}
        className={activate ? styles.activateTitle : styles.hide}
        sx={{position:"absolute",top:"60%",color:theme.palette.common.light,
      fontSize:{xs:"195%",sm:"400%",padding:"1rem",background:theme.palette.common.fadeCharcoal}
      }}
        > 
        Articles for the mind
        </Typography>
        <img 
        className={activate ? styles.showLogo : styles.hide} 
        src={logo} 
        
        alt="www.master-connect.ca"/>

    </MainTopCoverPage>
  )
}

export default TopCoverPage