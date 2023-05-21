import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
// import { useNavigate } from "react-router-dom";

import styled from "styled-components";
// import { Stack, Typography, Fab } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import styles from "./home.module.css";
import WeDevelop from "./WeDevelop";
import WeGrow from "./WeGrow";
import VideoBlogs from "./VideoBlogs";
import Scroller from "./Scroller";
import Partners from "./Partners";
import WeDesign from "./WeDesign";
import MainServices from './MainServices';
import HomeHelmet from './HomeHelmet';
import Innovators from './Innovators';
import HelpingBrands from './HelpingBrands';
import Cover from './Cover';
import LetUsHelp from './LetUsHelp';

const theme = createTheme({
  typo: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      "Source Sans Pro",
    ].join(","),
  },
});

const CustMainHome=styled.div`
margin:0;
padding:0;
// margin-top:20px;
display:flex;
height:auto;
justify-content:flex-start;
align-items:center;
flex-direction:column;
animation:clearIn 1.5s ease-in-out;
@keyframes clearIn {
  from {opacity:0;}
  to {opacity:1;}
}

`;


function Home() {
  const {  setOpen, staticImage,generalInfo } =
    React.useContext(GeneralContext);
  const afterZebra = `${staticImage}/zebra/afterZebra.png`;
  const lion = `${staticImage}/lion.png`;
  const lepard = `${staticImage}/lepard2.png`;
  const bango3 = `${staticImage}/extra/bango3.png`;
  const blackDesign = `${staticImage}/blackDesign.png`;
  const mainPic = `${staticImage}/main.png`;
  
  const [getVariant1, setGetVariant1] = React.useState("");
  const [getTitleVariant1, setGetTitlevariant1] = React.useState("");
  let [titleBlock, setTitleBlock] = React.useState(0);
  const [growOpacity, setGrowOpacity] = React.useState(1);
  const [growOpacity1, setGrowOpacity1] = React.useState(1);
  const [growOpacityText, setGrowOpacityText] = React.useState(1);
  const [growDownText, setGrowDowntext] = React.useState("100%");
  const [positionImage, setPositionImage] = React.useState("0% 0%");
  const [backgroundSizeImage, setbackgroundSizeImage] =React.useState("100% 100%");
    
  React.useEffect(() => {
    if (window.scrollY) {
      window.scroll(0, 0);
      setOpen(false);
    }
  }, []);

  React.useEffect(() => {
    setGetVariant1(window.innerWidth < 600 ? "h4" : "h2");
    setGetTitlevariant1(window.innerWidth < 600 ? "h3" : "h1");
    if (growOpacityText * 1.5 * 100 < 100) {
      setGrowDowntext(`${100 - growOpacityText * 1.5 * 100}%`);
    } else {
      setGrowDowntext("0%");
    }
  }, [growOpacityText]);

 

  

  
  
  return (
    <CustMainHome
      className={styles.custMainHome}
      style={{ fontFamily: theme.typo.fontFamily,background:"black" }}
      
    >
      <HomeHelmet/>
      <Cover mainPic={mainPic}/>
      
      <div className={styles.mainMain}>
      <WeDesign generalInfo={generalInfo} />

      <WeDevelop
        titleBlock={titleBlock}
        getTitleVariant1={getTitleVariant1}
        getVariant1={getVariant1}
        growOpacity={growOpacity}
        growOpacity1={growOpacity1}
        positionImage={positionImage}
        backgroundSizeImage={backgroundSizeImage}
      />
      <WeGrow growOpacityText={growOpacityText} growDownText={growDownText} />

      <MainServices pic={lion} pic2={bango3} black={blackDesign}/>
      <Innovators/>
      <HelpingBrands/>
      <VideoBlogs />
      <Scroller />
      <LetUsHelp/>
      <Partners />
      </div>
    </CustMainHome>
  );
}

export default Home;
