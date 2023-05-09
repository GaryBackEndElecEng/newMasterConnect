import React from 'react';
import styles from './design3.module.css';
import styled from 'styled-components';
import { Container, Stack, Typography } from '@mui/material';
// import {GeneralContext} from '../../context/GeneralContextProvider';

const CustbannerRings=styled.div`
margin:0;
width:100vw;
min-height:60vh;
opacity:${({open})=>open ? "1":"0"};
background-image:url(${({bgimage})=>bgimage});
background-position:50% 50%;
background-size:100% 100%;
position:relative;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
transform:translateY(${({open})=>open ? "0":"20"}%);
transition:all 1.5s ease-in-out;
animation:${({open})=>open ? "slideBackForth" : ""} 6s ease-in-out;
@media screen and (max-width:900px){
  background-position:50% 50%;
background-size:200% 100%;
@keyframes slideBackForth {
  from {background-position:0% 50%;}
  50% {background-position:100% 50%;}
  100% {background-position:50% 50%;}
}
}
@media screen and (max-width:600px){
  background-position:85% 50%;
background-size:200% 100%;
@keyframes slideBackForth {
  from {background-position:0% 50%;}
  50% {background-position:50% 50%;}
  100% {background-position:85% 50%;}
}
}
`;
const BannerRings = ({cover3Big,getWidth}) => {
  const openRef=React.useRef(null);
  const [openThis,setOpenThis]=React.useState(false);
  const [openThis2,setOpenThis2]=React.useState(false);

  React.useEffect(()=>{
    if(openThis){
      setTimeout(()=>{setOpenThis2(true);},1000);
    }
  },[openThis]);

  React.useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{
      let entry=entries[0];
      if(entry.isIntersecting){
        setOpenThis(true);
      }
    },{threshold:0.5});
    if(openRef.current){
    observer.observe(openRef.current);
    return()=>observer.disconnect()
    }
  },[]);
  return (
    <CustbannerRings
    bgimage={cover3Big}
    open={openThis}
    ref={openRef}
    className={styles.custbannerRings}
    >
      <Container maxWidth="xl" sx={{margin:"1rem auto"}}>
        <Stack direction="column" className={styles.center} sx={{marginBottom:"5vh",}}>
          <Typography component="h1" variant="h1" sx={{color:"black",}} className={openThis ? styles.ourRingsOnFontStyle : styles.ourRingsOff}>Our Rings</Typography>
        </Stack>
        <Stack direction="column" className={styles.ringsCenter}>
          <Typography component="h1" variant={getWidth <900 ? (getWidth < 600 ? "h4" :"h3"):"h1"} sx={{color:"black"}} className={openThis ? styles.ringsFontStyleOn : styles.ourRingsFontStyleOff}>Beautifully Crafted to fit your needs</Typography>
          <Typography component="h1" 
          variant={getWidth < 900 ? (getWidth < 600 ? "h3" :"h2") :"h2"}
          className={openThis2 ? styles.ringsFontStyleOn : styles.ourRingsFontStyleOff}
          sx={{marginTop:"4rem"}}
          >
            OUR SELECTION</Typography>
        </Stack>
        
      </Container>
  
    </CustbannerRings>
  )
}

export default BannerRings