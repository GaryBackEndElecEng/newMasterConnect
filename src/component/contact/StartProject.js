import React from 'react';
import {useNavigate} from 'react-router-dom';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from './contact.module.css';
import {Grid, Container, Typography, Stack,Fab} from '@mui/material';
import styled from "styled-components";
import RequestProject from './RequestProject';
import SocialMedia from '../about/SocialMedia';


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
position:relative;
display:flex;
flex-direction:column !important;
background-image:url(${({bgimage})=>bgimage});
filter:saturate(2);
filter:contrast(1.2);
background-position:65% 40%;
background-size:150% 150%;
padding:5px;
animation growIn 3.5s ease-in-out;
@keyframes growIn {
  from {
    background-position:0% 50%;
    background-size:250% 150%;
  }
  to {
    background-position:65% 40%;
    background-size:150% 150%;
  }
}
@media screen and (max-width:900px){
    
    height:50vh;
}
@media screen and (max-width:600px){
  background-position:50% 50%;
  background-size:100% 100%;
  @keyframes growIn {
    from {
      background-position:0% 50%;
      background-size:250% 150%;
    }
    to {
      background-position:50% 50%;
      background-size:100% 100%;
    }
  }
}
`;
const CustTypo=styled(Typography)`
margin:auto;
position:absolute;
bottom:5%;
@media screen and (max-width:600px){
  bottom:0%;
}

`;

const StartProject = () => {
  const navigate=useNavigate();
  const {staticImage,generalInfo}=React.useContext(GeneralContext);
  const rino=`${staticImage}/rino.png`;
  const setSize=window.innerWidth < 900 ? "h3":"h1";
  React.useEffect(()=>{
    if(window.scrollY){
      window.scroll(0,0);
    }
  },[]);
  const handleContact=(e)=>{
    e.preventDefault();
    navigate("/contact");
  }

  return (
    <Main >
      <Container maxWidth="lg">
        
        <div className={styles.hr_line}/>
        <Grid container spacing={0} className={styles.mainGrid}>
          <GridbackImage
           item xs={12} sm={6} md={6} 
          className={styles.childGrid} 
          bgimage={rino}
          >
          <Typography component="h1" variant={setSize} sx={{backgroundColor:"rgba(0,0,0,.3)",padding:"5px"}}>Start a Project</Typography>
          <CustTypo component="h2" variant="h5"
          sx={{backgroundColor:"rgba(0,0,0,.3)",padding:"5px"}}
          >
            Lets start a project. from one week we'll get it done!- we will get back to you within one to two days. </CustTypo>
          </GridbackImage>
          <Grid item xs={12} sm={6} md={6} className={styles.childGridForm} sx={{display:"flex",flexDirection:"column",padding:"5px"}}>
          <RequestProject/>
          </Grid>
        </Grid>
        <Container maxWidth="sm" sx={{display:"flex",flexDirection:"column"}}>
          <div className={styles.hr_line}/>
          <Fab color="primary" size="large" variant="extended"
          onClick={(e)=>handleContact(e)}
          >
          <Typography component="h1" variant={"h6"}> Contact Us</Typography>
          </Fab>
        </Container>
        
      
        <div className={styles.hr_line}/>
        <Stack direction="column" sx={{justifyContent:"center",alignItems:"center",width:"100%",marginBottom:"2rem"}}>
          <div style={{width:"350px"}}>
        <SocialMedia contactInfo={generalInfo}/>
        </div>
        </Stack>
      </Container>

    </Main>
  )
}

export default StartProject;