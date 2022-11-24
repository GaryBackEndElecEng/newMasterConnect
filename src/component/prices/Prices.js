import React, { useContext, useEffect,useState } from 'react';
import styled from 'styled-components';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {PriceContext} from '../../context/PriceContextProvider';
import RegisterPage from '../RegisterPage';
import DesignPricing from './DesignPricing';
import CoverPage from './CoverPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import PriceHelmet from './PriceHelmet';



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
 
  const { staticImage, setTitle, setStyleName,conical,getPathLocation} = useContext(GeneralContext);
  const {baseServices,startingPrices,getProductList}=useContext(PriceContext);
  const [keywords,setKeywords]=useState(null);
  const [summary,setSummary]=useState(null);
  const [image,setImage]=useState(null);
  const [price,setPrice]=useState(null);
  const [descrip,setDescript]=useState("");
  const [products,setProducts]=useState([]);
  const priceBg = `${staticImage}/prices.png`;
  
useEffect(()=>{
if( baseServices.loaded ){
 let arrWords=[],tempDesc="";
 const lowestPrice=Math.min(...startingPrices.data.map(obj=>(obj.monthly)));
const statement=`All pricing for a world's best design,starting price $ ${lowestPrice}.00 CAD, including AMAZING effects ALL for an AMAZING low price.Visit https://www.master-connect.ca`
 arrWords=arrWords.concat(baseServices.data.map(obj=>(obj.name)));
 arrWords=arrWords.concat(startingPrices.data.map(obj=>(obj.name)));
 setKeywords(arrWords)
 tempDesc=statement;
 baseServices.data.forEach((obj,index)=>{
  tempDesc=tempDesc + ",,," + index + ")."  + obj.desc
 });
 startingPrices.data.forEach((obj,index)=>{
  tempDesc=tempDesc + ",,," + index + ")." + obj.desc
 });
 setDescript(tempDesc)
 setSummary(statement)
 setPrice(lowestPrice)
setImage(priceBg)
}
},[ baseServices.loaded,baseServices.data, startingPrices.loaded,startingPrices.data,priceBg]);

useEffect(()=>{
  if(getProductList.loaded && getProductList.data){
    setProducts(getProductList.data)
  }
},[getProductList.loaded,getProductList.data]);

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
      <PriceHelmet
       keywords={keywords}
       summary={summary}
       desc={descrip} 
      price={price}
       image={image}
       products={products} 
      staticImage={staticImage}
       conical={conical.loaded ? conical.data:""}
       getPathLocation={getPathLocation.loaded ? getPathLocation.data:""}
      />
      <GetRegisterPages/>
      <RegisterPage/>
      <CoverPage/>
      <DesignPricing productList={getProductList}/>
    </PriceContainer>
  )
}

export default Prices