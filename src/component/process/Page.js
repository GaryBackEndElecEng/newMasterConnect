import React from "react";
import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from "./process.module.css";
import {  Typography, Stack, Grid, Box, Card, CardMedia } from "@mui/material";
import styled from "styled-components";
import Tab from './Tab';

const CustPage = styled.div`
  margin: auto;
  position: absolute;
  top: 0%;
  left: ${({ left }) => left}%; //add isWidth =>900px and 600px for left=0%
  z-index: ${({ zindex }) => zindex};
  width: 800px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5%;
  flex-direction: column;
  background: ${({ index,isPage }) =>
    ((index > 0 && isPage) || (index===0 )) ? "white" : "black"};
  //   border: 5px solid red;
  transition: all 1s ease-in;

  @media screen and (max-width: 900px) {
    position:relative;
    top: 0%;
    left:0%;
    padding-top: 1%;
    opacity:1;
    width: 820px;
    height:auto;
    background:white;
    padding:5px;
    z-index:1;
   
  }
  @media screen and (max-width: 600px) {
    position:relative;
    width: 350px;
    height: auto;
    opacity:1;
    background:white;
    left:0%
    
    
  }
 
`;
const Page = ({ slideArr, obj, index }) => {
    const {activate}=React.useContext(GeneralContext);
  const pageRef = React.useRef();
  const [iswidth, setIswidth] = React.useState(false);
  const [isWidth600,setIsWidth600]=React.useState(false);
  const isPage=((activate.state && activate.id === `folder-${index}`)|| isWidth600) ? true : false;
  
  React.useEffect(() => {
    if (window.innerWidth < 900) {
      setIswidth(true);
    } if(window.innerWidth <600){
        setIsWidth600(true);
    };
  }, []);
  
// isWidth IS TRUE => LESS 900PX 
  function adjustLeftInactive(index,isWidth) {
    if (index < 6 && !isWidth) {
      switch (index) {
        case 5:
          return 90;
        case 4:
          return 90 - 5;
        case 3:
          return 90 - 10;
        case 2:
          return 90 - 15;
        case 1:
          return 90 - 20;
        default:
          return 0;
      }
    }else{return 0;}
  }
  

  return (
    <CustPage
      ref={pageRef}
      index={index}
      top900={3.5}
      left={
        (isPage )
          ? (index / 5) * 20
          : adjustLeftInactive(index,iswidth)
      }
      zindex={isPage ? index * 10:0}
      id={`folder-${index}`}
      isWidth={iswidth}
      isPage={isPage}
      left900={isPage ? 5:3}
      height900={isPage ? 80 : 0.5}
      width900={isPage ? 90 : 0}
      isWidth600={isWidth600}
    >
      <Tab index={index} obj={obj} 
      iswidth={iswidth}
       isPage={isPage}
       isWidth600={isWidth600}
      />
      <section className={(isPage ) || (index ===0 ) || (iswidth)? styles.sectionOn:styles.sectionOff}>
        <Card elevation={3} sx={{background:"transparent",margin:"1rem auto"}}>
        <CardMedia component="img" src={obj.image} height={"50%"} alt="www.masterconnect.ca"/>
        <Typography component="h1" variant="h3" className={styles.folderTitle}>
          {obj.name}
        </Typography>
        <Typography component="h1" variant="h5" className={styles.folderTitle}>
          General
        </Typography>
        <Typography component="h1" variant="h6" style={{ color: "black", textAlign:"center" }}>
          {obj.comment}
        </Typography>
        <Typography component="h1" variant="h6" style={{ color: "black",margin:"0.5rem auto"}}>
          {obj.desc}
        </Typography>
        <Typography component="h1" variant="h6" style={{ color: "black" }}>
          {obj.desc1}
        </Typography>
        <Typography component="h1" variant="h6" style={{ color: "black",margin:"0.5rem auto",marginBottom:"3rem" }}>
          {obj.desc2}
        </Typography>
        </Card>
      </section>
    </CustPage>
  );
};

export default Page;
