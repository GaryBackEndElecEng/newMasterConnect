import React from "react";
import styles from "./about.module.css";
import {
    Stack,
    Typography,
    Container,
  } from "@mui/material";
  import styled from 'styled-components';

  const TypoEffect=styled(Typography).attrs({className:styles.colorTypo})`
  font-family: var(--font-family);
    background-image: var(--background-image-1-left);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
        color: transparent;
    animation: colorChange 5s ease-in-out;
    @keyframes colorChange {
      from {opacity:0.3;transform:scale(0.8);}
      to {opacity:1;}
    }
  `;

const AboutMain = ({fontSize,getWidth}) => {
  const [start,setStart]=React.useState(false);
  const [first,setFirst]=React.useState(false);
  const [second,setSecond]=React.useState(false);
  const [third,setThird]=React.useState(false);
  React.useEffect(()=>{
    setTimeout(()=>{setStart(true);},2000);
    if(start){
      setTimeout(()=>{setFirst(true);},1000);
    }
    if(first){
      setTimeout(()=>{setSecond(true);},1000);
    }
    if(second){
      setTimeout(()=>{setThird(true);},1000);
    }
  },[start,first,second]);
  return (
    <Container maxWidth="xl" sx={{marginTop:"5vh",padding:0}}>
        <Stack
          direction={{ md: "row", xs: "column" }}
          spacing={{xs:0,md:5,sm:2}}
          className={styles.main}
          
        >
          <Stack direction="column">
            <TypoEffect component="h1" variant="h1">
              Hello
            </TypoEffect>
            <TypoEffect component="h1" variant={fontSize}>
              We are Master Connect Digital
            </TypoEffect>
            <Typography component="h2" variant={getWidth < 900 ? (getWidth < 600 ? "h5":"h4"):"h3"}>
              We are a start-up design and technology , building sites for today's Digital Age.
            </Typography>
          </Stack>
          <Stack direction="column">
            <Stack direction="column" className={first ? styles.turnOn : styles.turnOff}>
              <Typography component="h1" variant="h2">
                2+
              </Typography>
              <Typography component="h1" variant={getWidth < 900 ? "h5":"h4"}>
                more than 2-years in operation
              </Typography>
            </Stack>
            <Stack direction="column" className={second ? styles.turnOn : styles.turnOff}>
              <Typography component="h1" variant="h2">
                15+
              </Typography>
              <Typography component="h1" variant={getWidth < 900 ? "h5":"h4"}>
                Websites & projects built
              </Typography>
            </Stack>
            <Stack direction="column" className={third ? styles.turnOn : styles.turnOff}>
              <Typography component="h1" variant="h2">
                2+
              </Typography>
              <Typography component="h1" variant={getWidth < 900 ? "h5":"h4"}>
                IOS and Android apps built, backend connected and launched
              </Typography>
            </Stack>
          </Stack>
          
        </Stack>
        {/* <div className={styles.hr_underline}/> */}
      </Container>
  )
}

export default AboutMain