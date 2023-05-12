import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./design.module.css";
// import { Container, Typography, Stack, IconButton } from "@mui/material";
import styled from "styled-components";
import Banner1 from './Banner1';
import BannerTop from './BannerTop';
import MasterProduct from './MasterProduct';
import ContactInfo from './ContactInfo';
import CoverPage from './CoverPage';


const CustMainDesign=styled.div`
min-height:280vh;
  width:100vw;
  margin:0;
  padding:0;
  margin-top:-50px;
  box-sizing:border-box;
  background:var( --background-design);
  animation: designIn 1s ease-in;
  @keyframes designIn {
    from { opacity:0;}
    to { opacity:1;}
  }

`;

const Designs = () => {
  const { productDesigns,contactInfo,staticImage,open, setOpen } = React.useContext(GeneralContext);
  const [iconWidth, setIconWidth] = React.useState(null);
  const [length, setLength] = React.useState(null);
  const [max600, setMax600] = React.useState(false);
  const [getWidth,setGetWidth]=React.useState(null);

  React.useEffect(()=>{
    setGetWidth(window.innerWidth);
  },[]);

  React.useEffect(() => {
    if (window.innerWidth && window.innerWidth < 600) {
      setIconWidth("37px");
      setMax600(false);
    } else if (window.innerWidth && window.innerWidth < 900) {
      setIconWidth("48px");
    } else {
      setIconWidth("60px");
      setMax600(true);
    }
  }, []);

  
  

  React.useEffect(() => {
    if (productDesigns.loaded) {
      setLength(productDesigns.data.length);
    }
  }, [productDesigns.loaded,productDesigns.data]);

  return (
    <CustMainDesign className={styles.mainDesign} >
      <CoverPage getWidth={getWidth} />
      <BannerTop/>
      
      <MasterProduct
      staticImage={staticImage}
      productDesigns={productDesigns}
      max600={max600}
      iconWidth={iconWidth}
      length={length}
      />
      
      <Banner1/>
    <ContactInfo contactInfo={contactInfo} />
      
    </CustMainDesign>
  );
};

export default Designs;
