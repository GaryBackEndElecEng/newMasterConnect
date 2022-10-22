import React, { useContext, useEffect,useState } from 'react';
import {useLocation}from 'react-router-dom';
import styles from './price.module.css';
import styled from 'styled-components';
import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {PriceContext} from '../../context/PriceContextProvider';
import RegisterPage from '../RegisterPage';
import { useTheme } from '@mui/material/styles';
import api from '../axios/api';
import FoundationIcon from '@mui/icons-material/Foundation';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import CheckIcon from '@mui/icons-material/Check';
import DesignPricing from './DesignPricing';
import CoverPage from './CoverPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import PriceHelmet from './PriceHelmet';
import { ArrowForwardSharp } from '@mui/icons-material';


const PriceContainer = styled.div.attrs({ className: "container-fluid priceContainer" })`
margin:0;
background-image:url(${({ bg }) => bg});
width:100vw;
min-height:20vh;
padding:0;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
animation: clearIn 1.5s ease-in-out;
@keyframes clearIn {
  from {opacity:0;}
  to {opacity:1;}
}
@media screen and (max-width:900px){
  margin-top:-5px;
}
@media screen and (max-width:600px){
  margin-top:-52px;
}

`;




const Prices = () => {
  const location=useLocation();
  const theme = useTheme();
  const { staticImage, setTitle, setStyleName,} = useContext(GeneralContext);
  const {baseServices,startingPrices,priceCatelog,getProductList}=useContext(PriceContext);
  const [keywords,setKeywords]=useState(null);
  const [summary,setSummary]=useState(null);
  const [desc,setDesc]=useState(null);
  const [image,setImage]=useState(null);
  const [price,setPrice]=useState(null);
  const priceBg = `${staticImage}/prices.png`;
  
useEffect(()=>{
if( baseServices.loaded ){
 let arrWords=[],arrDesc=[];

 arrWords=arrWords.concat(baseServices.data.map(obj=>(obj.name)));
 arrWords=arrWords.concat(startingPrices.data.map(obj=>(obj.name)));
 setKeywords(arrWords)
 arrDesc=arrDesc.concat(baseServices.data.map(obj=>(obj.desc)));
 arrDesc=arrDesc.concat(startingPrices.data.map(obj=>(obj.desc)));
 setDesc(arrDesc)
 setSummary("All pricing for a world's best design, including AMAZING effects ALL for an AMAZING low price.Visit https://www.master-connect.ca")
 setPrice(Math.min(...startingPrices.data.map(obj=>(obj.monthly))))
 
setImage(priceBg)
}
},[ baseServices.loaded, startingPrices.loaded]);
  

// console.log(priceCatelog.data)
  useEffect(() => {
    setTitle("Pricing");
    setStyleName("Starting Pricing");
    if(window.scrollY){
      window.scroll(0,0);
      
  }
  }, [ setTitle, setStyleName]);

 

  return (
    <PriceContainer >
      <PriceHelmet keywords={keywords} summary={summary} desc={desc} price={price} image={image}/>
      <GetRegisterPages/>
      <RegisterPage/>
      <CoverPage/>
      <DesignPricing productList={getProductList}/>
    </PriceContainer>
  )
}

export default Prices