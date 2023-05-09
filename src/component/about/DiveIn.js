import React from "react";
import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from "./about.module.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Stack, Typography, CardMedia, Grid, Container } from "@mui/material";

const ImageContainer = styled.div`
  position: absolute;
  margin: auto;
  width: 50%;
  height: 120%;
  left: ${({ left }) => left}%;
  top: ${({top})=>top}%;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  scroll-snap-type: x mandatory;
  box-sizing: border-box;
//   border:1px solid red;
`;

const ImageForward=styled.img`
width:2900px;
marginLeft: "0px";
height:125%; 
animation:slideForward 44s linear infinite;
@keyframes slideForward {
    from {transform:translateX(-85%);}
    to {transform:translateX(0%);}
}
`;
const ImageReverse=styled.img`
width:2900px;
marginLeft: "0px";
height:125%;
animation:slideForward 44s linear reverse infinite;
@keyframes slideForward {
    from {transform:translateX(-85%);}
    to {transform:translateX(0%);}
}
`;

const DiveIn = () => {
  const {staticImage}=React.useContext(GeneralContext);
  
  const happyPhones = `${staticImage}/happy/phoneSmiles.png`;
  const happyPhones1 = `${staticImage}/happy/phoneSmiles2.png`;
  return (
    <Container maxWidth="xl" >
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 5 }}
        className={styles.mainDiveIn}
      >
        <Grid item xs={12} md={8} className={styles.diveInGridItemMain}>
          <div>
            <h1 >
              Dive In
            </h1>
            <Link to={"/process"}>
              <Typography component="h2" variant="h2">
                Our Process
              </Typography>
            </Link>
            <Link to={"/designs"}>
              <Typography component="h2" variant="h2">
                Our Work
              </Typography>
            </Link>
          </div>
        </Grid>
        <Grid item xs={12}  md={4} className={styles.diveInGridItem}>
          <div>
            <ImageContainer 
            justifycontent={"flex-start"}
             left={2}
             top={-3}
            >
              <ImageForward
                src={happyPhones}
                alt="www.masterconnect.ca"
                style={{width: "2900px", marginLeft: "0px",height:"105%", }}
              />
            </ImageContainer>
            <ImageContainer
             left={50}
             top={-3}
            >
              <ImageReverse
                src={happyPhones}
                alt="www.masterconnect.ca"
                style={{ width: "2900px", marginLeft: "0px",height:"105%",}}
              />
            </ImageContainer>
          </div>
          <div>
            <ImageContainer 
            left={2}
            top={0}
            >
              <ImageForward
                src={happyPhones1}
                alt="www.masterconnect.ca"
                style={{ width: "2900px", marginLeft: "0px",height:"100%", }}
              />
            </ImageContainer>
            <ImageContainer
            left={50}
            top={0}
            >
              <ImageReverse
                src={happyPhones1}
                alt="www.masterconnect.ca"
                style={{ width: "2900px", marginLeft: "0px",height:"100%", }}
              />
            </ImageContainer>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DiveIn;
