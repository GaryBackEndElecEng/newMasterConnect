import React from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from './contact.module.css';
import {Grid, Container, Typography} from '@mui/material';
import styled from "styled-components";
import RequestForm from './RequestForm';



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

const Contact = () => {
  const { staticImage,open, setOpen } = React.useContext(GeneralContext);
 
  const cheetah=`${staticImage}/extra/cheetah.png`;
  
  return (
    <Main  >
      <Container maxWidth="lg">
      <div className={styles.hr_line}/>
        <Grid container spacing={3} className={styles.mainGrid}>
          <Grid item xs={12} sm={6} md={6} className={styles.childGrid} style={{backgroundImage:`url(${cheetah})`,backgroundPosition:"50% 30%"}}>
          <Typography component="h1" variant="h1">Hello.</Typography>
          <Typography component="h2" variant="h3">How can we help with for today?</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} className={styles.childGridForm} sx={{display:"flex",flexDirection:"column"}}>
            <RequestForm/>
          </Grid>
        </Grid>
        <div className={styles.hr_line}/>
        
        
      </Container>

    </Main>
  )
}

export default Contact;