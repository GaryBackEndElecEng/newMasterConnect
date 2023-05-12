import React from "react";
// import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./process.module.css";
import { Container, Typography,Grid } from "@mui/material";
import styled from "styled-components";
import TopSlide from './TopSlide';

const CustMainTop=styled.div`
margin: 3rem auto;
padding:0.5rem;
width:100%;
`;
const TopContainer = ({slideArr}) => {
    const is600 = window.innerWidth <600 ? true:false;
    const styleFont={fontFamily: "var(--font-family)",
        backgroundImage: "var(--background-1)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom:"0.62rem",
            transition: "all 1s ease-in"}


  return (
    <CustMainTop>
    <Container maxWidth="xl">
        <div className={styles.mainTop}>
                
            <Grid container className={styles.topGridCont}>
                <Grid item xs={12} sm={12} md={6} >
                    <div>
                <Typography component="h1" variant={is600 ? "h1":"h1"} className={styles.fontStyle_2} >Guiding</Typography>
                <Typography component="h1" variant={is600 ? "h3":"h2"} className={styles.fontStyle_2} style={styleFont}> you from design, frontend and backend to launch,,,</Typography>
                </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} >
                    <div className={styles.processSteps}>
                        <Typography component="h1" variant="h2" sx={{marginBottom:"1rem"}}
                        className={styles.fontStyle}
                        >
                            We provide
                            </Typography>
                    <TopSlide slideArr={slideArr}/>
                    </div>
                </Grid>
            </Grid>
            
            </div>
        </Container>
        </CustMainTop>
  )
}

export default TopContainer