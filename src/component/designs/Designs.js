import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./design.module.css";
// import { Container, Typography, Stack, IconButton } from "@mui/material";
// import styled from "styled-components";
import Banner1 from './Banner1';
import BannerTop from './BannerTop';
import MasterProduct from './MasterProduct';
import ContactInfo from './ContactInfo';
import CoverPage from './CoverPage';




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
    <div className={styles.mainDesign} >
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
      
    </div>
  );
};

export default Designs;
