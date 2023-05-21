import React from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import { Stack, Typography, Grid, CardMedia, Container } from "@mui/material";
import styles from "./about.module.css";
import styled from "styled-components";


const CustPageContainer=styled.div`
opacity:${({opacity})=>opacity};
position:relative;
z-index:${({zindex})=>zindex};
background:${({bg})=>bg};
width:50%;
height:100%;
// background-size:10% 10%;
// background-position:50% 50%;
trasition: all 1.5s ease-in-out;
@media screen and (max-width:900px){
  width:100%;
  opacity:1;
}
@media screen and (max-width:600px){
    height:auto;
    top:0%;
}
`;
const TypoStyle=styled(Typography)`
font-family: var(--font-family);
background-image: var(--background-image-1-left);
-webkit-background-clip: text;
-moz-background-clip: text;
background-clip: text;
color: transparent;
@media screen and (max-width:600px){
    font-size:380% !important;
}
`;
const TextArea1 = styled.div`
padding-inline:1rem;
color:white;
width:100%;
@media screen and (max-width:900px){
    padding-inline:0.5rem;
}

`;

const TextPageContainer = ({obj,opacity,reposition,folderLogic,getWidth}) => {
    const {staticImage}=React.useContext(GeneralContext);
    const fontSizeH6=window.innerWidth < 600 ? "body1":"h6";
    const setBg=( obj.object==="Connect" ) ? "transparent":"black";
    
   
  return (
    <CustPageContainer
    // zindex={setbg==="black" ? "-2":"0"}
    bg={setBg}
    // bgimage={`${staticImage}/${obj.image}`}
    opacity={obj.object==="Connect" ? "1": opacity}
    >
        <TextArea1
        
        className={styles.textArea}>
            <Typography component="h1" variant="h1">{ obj && obj.name}</Typography>
            <Typography component="h2" variant={fontSizeH6}>
                {obj.desc1 && obj.desc1}
            </Typography>
            <Typography component="h2" variant={fontSizeH6}>
                {obj.desc2 && obj.desc2}
            </Typography>
            <Typography component="h2" variant={fontSizeH6}>
                {obj.desc3 && obj.desc3}
            </Typography>
        </TextArea1>
        <TypoStyle component="h2" variant={"h1"}>
           {obj && obj.object}
            </TypoStyle>
            </CustPageContainer>
  )
}

export default TextPageContainer