import React from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from './contact.module.css';
import {Grid, Container, Typography} from '@mui/material';
import styled from "styled-components";
import RequestProject from './RequestProject';


const Main = styled.div`
width:100vw;
min-height:100vh;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
animation: slideIn 1s ease-out;
background: linear-gradient(217deg,
   rgba(25,0,0,.8), rgba(255,0,0,0) 70.71%),            
   linear-gradient(127deg, rgba(0,25,0,.8), rgba(0,255,0,0) 70.71%),            
    linear-gradient(336deg, rgba(0,100,255,.8), rgba(0,0,255,0) 70.71%);
@keyframes slideIn {
  from {transform:translateX(-100%);opacity:0.5;}
  to {transform:translateX(0%);opacity:1;}
}
`;
const GridbackImage=styled(Grid)`
font-family: var(--font-family);
color:white;
background-image:url(${({bgimage})=>bgimage});
background-position:65% 50%;
padding:5px;
@media screen and (max-width:900px){
    background-position: 85% 50%;
}
@media screen and (max-width:600px){
    background-position: 50% 50%;
    background-size:97% 100%;
}
`;
const StartProject = () => {
  const {staticImage}=React.useContext(GeneralContext);
  const cheetah=`${staticImage}/extra/cheetah2.png`;
  React.useEffect(()=>{
    if(window.scrollY){
      window.scroll(0,0);
    }
  },[]);

  return (
    <Main >
      <Container maxWidth="lg">
        
        <div className={styles.hr_line}/>
        <Grid container spacing={0} className={styles.mainGrid}>
          <GridbackImage
           item xs={12} sm={6} md={6} 
          className={styles.childGrid} 
          bgimage={cheetah}
          >
          <Typography component="h1" variant="h1" sx={{backgroundColor:"rgba(0,0,0,.3)",padding:"5px"}}>Start a Project</Typography>
          <Typography component="h2" variant="h3" sx={{backgroundColor:"rgba(0,0,0,.3)",padding:"5px"}}>Lets start a project. from one week we'll get it done!- we will get back to you within one to two days. </Typography>
          </GridbackImage>
          <Grid item xs={12} sm={6} md={6} className={styles.childGridForm} sx={{display:"flex",flexDirection:"column",padding:"5px"}}>
          <RequestProject/>
          </Grid>
        </Grid>
        <div className={styles.hr_line}/>
      </Container>

    </Main>
  )
}

export default StartProject;