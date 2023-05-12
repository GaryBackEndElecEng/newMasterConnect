import React from "react";
import styles from "./about.module.css";
import styled from "styled-components";
import AboutMain from './AboutMain';
import {
  Stack,
  Typography,
  Container,
} from "@mui/material";

const TypoEffect22=styled(Typography)`
  font-family: var(--font-family);
    background-image: var(--background-image-2-right);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
        color: transparent;
  `;

const AboutMainAfter = ({getWidth,fontSize}) => {
  const showRef1=React.useRef(null);
  const showRef2=React.useRef(null);
  const [turnOn1,setTurnOn1]=React.useState(false);
  const [thisThreshold,setThisThreshold]=React.useState(1);

  React.useEffect(()=>{
    
    if(window.innerWidth <600){
      setThisThreshold(0.25);
    }else{
      setThisThreshold(0.85);
    }
    const observer= new IntersectionObserver((entries,index)=>{
      entries.forEach(entry=>{
        
        
        if(entry.isIntersecting){
        setTurnOn1(true);
        
        }
      });
    },{threshold:thisThreshold});
    const arr=[showRef1,showRef2];
    arr.forEach((entry,index)=>{
      observer.observe(entry.current);
    });
    
  },[]);
  return (
    <Container maxWidth="xl" sx={{marginTop:"10vh"}}>
        {/* <div className={styles.hr_underline}/> */}
      <Stack
          direction={{ md: "row", xs: "column" }}
          spacing={5}
          className={styles.weDo}
        >
          <Stack direction="column" ref={showRef1} className={turnOn1 ? styles.aboutMainAfterTurnOn1 : styles.turnOff}>
            <TypoEffect22 component="h1" variant="h1">
              We are
            </TypoEffect22>
            <TypoEffect22 component="h1" variant={fontSize}>
              Creative Designers with a solid passion in what we do
            </TypoEffect22>
            <Typography component="h2" variant="h4">
              - having the passion of creation
            </Typography>
          </Stack>
          <Stack direction="column" ref={showRef2} className={turnOn1 ? styles.aboutMainAfterTurnOn1 : styles.turnOff}>
            <Stack direction="column">
              <p component="h1" variant="h2" className={styles.fontEffect}>
                Create Passion
              </p>
              <Typography component="h1" variant={window.innerWidth < 600 ? "h5":"h4"}>
               We are innovators in Beautiful Montreal and growing - let us grow with you.
              </Typography>
            </Stack>
          </Stack>
          
        </Stack>
      </Container>
  )
}

export default AboutMainAfter