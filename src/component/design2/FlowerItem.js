import React from "react";
import styled from "styled-components";
import {Container, Grid, Typography,Fab,Stack} from "@mui/material";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./design2.module.css";
import Star from './Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const MainFlower=styled.div.attrs({className:styles.flowerItem})`
margin:auto;
background-image:url(${({bgimage})=>bgimage});
background-position:50% 50%;
background-size:100% 100%;
filter:saturate(2);
width:100%;
height:400px;
display:flex;
justify-content:flex-start;
flex-direction:column;
align-items:center;
place-items:center;
position:relative;

`;

const FlowerItem = ({obj}) => {
  // const {setSelected}=React.useContext(GeneralContext);
  

  return (
    <MainFlower
    bgimage={obj.image}
   
    >
      <Star star={obj.rating}/>
        <Typography component="h1" variant="h3" sx={{background:"rgba(0,0,0,0.2)",padding:"5px 10px"}}>{obj.name}</Typography>
        
      <Stack direction="row" sx={{position:"absolute",bottom:"0%",left:"0%"}}>
      <Fab color="secondary" size="small" variant="extended">
        <LocalOfferIcon  />
      <Typography component="h1" variant="h6" >detail</Typography>
      </Fab>
      </Stack>
    </MainFlower>
  )
}

export default FlowerItem