import React from "react";
import styles from "./video.module.css";
import styled from 'styled-components';
import { GeneralContext } from "../../context/GeneralContextProvider";
import { Stack, Grid, Typography } from "@mui/material";

const CustLetter=styled.span`
z-index:200;
margin:0 2px;
background-clip:text;
-webkit-background-clip:text;
background-position:100% 100%;
background-size:400% 400%;
background-image:var(--background-image-1-left);
color:transparent;
font-size:500%;
-webkit-text-stroke:2px grey ;
animation:letterAnimate 6.25s linear infinite;
@keyframes letterAnimate {
    from {opacity:1;transform:scaleX(-1);background-position:0% 0%;}
    50% {opacity:1;transform:scaleX(1);background-position:100% 100%;}
    to {opacity:1;transform: scaleX(-1);background-position:0% 0%;}
}
@media screen and (max-width:900px){
  font-size:400%;
}
@media screen and (max-width:600px){
  font-size:470%;
}
`;
const CustumWord=styled.span`
display:flex;
flex-wrap:nowrap;
margin:0 10px;
width:100%;

`;

const WordEffect = ({ word }) => {
    const arr = word.split("");
  const { staticImage2 } = React.useContext(GeneralContext);
  const swirl = `${staticImage2}/extra/swirls.png`;
  
  return (
    <CustumWord>
      {arr &&
        arr.map((letter,index) => (
            <CustLetter bgimage={swirl} key={index}
            >
              {letter && letter}
            </CustLetter>
        ))}
    </CustumWord>
  );
};

export default WordEffect;
