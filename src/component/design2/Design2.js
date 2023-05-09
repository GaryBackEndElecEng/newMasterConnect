import React from "react";
import {GeneralContext} from '../../context/GeneralContextProvider';
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import styles from './design2.module.css';
import { Stack, Typography, Fab } from "@mui/material";
import Cover from './Cover';
import FlowTagScroll from './FlowTagScroll' ;
import FlowerDisplay from './FlowerDisplay' ;
import HandCrafted from './HandCrafted';
import FamilyOwned from './FamilyOwned';
import SendMsg from './SendMsg';

const MainDesign2=styled.div`
margin:0;
height:auto;
display:flex;

position:relative;
justify-content:center;
align-items:center;
flex-direction:column;
width:100%;
animation: slideAccross 1.5s ease-in-out;
@keyframes slideAccross {
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:900px){
    // min-height:110vh;
}
@media screen and (max-width:600px){
    // min-height:110vh;
}

`;


const Design2 = () => {
    // const {staticImage2}=React.useContext(GeneralContext);
    const [getWidth,setGetWidth]=React.useState(null);
    React.useEffect(()=>{
        setGetWidth(window.innerWidth);
        if(window.scrollY){
            window.scroll(0,0);
        }
    },[]);
  return (
    <MainDesign2
    className={styles.mainDesign2}
    >
    <Cover getWidth={getWidth}/>
    <FlowTagScroll  getWidth={getWidth}/>
    <FlowerDisplay getWidth={getWidth}/>
    <HandCrafted getWidth={getWidth} />
    <FamilyOwned getWidth={getWidth}/>
    <SendMsg getWidth={getWidth}/>
    </MainDesign2>
  )
}

export default Design2