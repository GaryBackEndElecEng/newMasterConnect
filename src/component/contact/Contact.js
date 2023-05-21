import React from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from './contact.module.css';
import {Grid, Container, Typography, Stack} from '@mui/material';
import styled from "styled-components";
import RequestForm from './RequestForm';
import SocialMedia from '../about/SocialMedia';
import ContactHelmet  from './ContactHelmet';



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
const CustChildGrid=styled(Grid)`
display:flex;
flex-direction:column !important;
background-image:url(${({bgimage})=>bgimage});
background-size:100% 100%;
background-position: 50% 50%;
animation: growIn 4s ease-in-out;
@keyframes growIn {
  from {background-size:200% 200%;}
  to {background-size:100% 100%;}
}
@media screen and (max-width:900px){

}
@media screen and (max-width:600px){

}
`;

const Contact = () => {
  const { staticImage,open, setOpen ,generalInfo} = React.useContext(GeneralContext);
 
  const cheetah=`${staticImage}/extra/cheetah.png`;
  
  return (
    <Main  >
      <ContactHelmet generalInfo={generalInfo.loaded ? generalInfo.data :null}/>
      <Container maxWidth="lg">
      <div className={styles.hr_line}/>
        <Grid container spacing={3} className={styles.mainGrid}>
          <CustChildGrid
          bgimage={cheetah}
           item xs={12} sm={6} md={6} 
           className={styles.childGrid} 
          >
          <Typography component="h1" variant="h1" className={styles.fontStyleCt}>Hello.</Typography>
          <Typography component="h2" variant="h3" sx={{margin:"2rem auto"}}>How can we help?</Typography>
          </CustChildGrid>
          <Grid item xs={12} sm={6} md={6} className={styles.childGridForm} sx={{display:"flex",flexDirection:"column"}}>
            <RequestForm/>
          </Grid>
        </Grid>
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

export default Contact;