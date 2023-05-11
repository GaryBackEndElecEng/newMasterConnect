import React from "react";
import styles from "./process.module.css";
import {  Typography, Stack, Grid, Box } from "@mui/material";
import styled from "styled-components";
import {GeneralContext} from '../../context/GeneralContextProvider';

const CustTab=styled(Box)`
position:absolute;
    min-height:100%;
    width:8%;
    left:${({left})=>left}%;
    background:black;
    color:white;
    border-left:3px solid blue;
    border-top:3px solid blue;
    z-index:200;
    cursor:pointer;
    @media screen and (max-width:900px){
      display:none;
    }
    @media screen and (max-width:600px){
      display:none;
      
    }
`;

const Tab = ({index,obj,iswidth,isPage,isWidth600}) => {
  const {activate,setActivate}=React.useContext(GeneralContext);
const [fontsize,setFontsize]=React.useState(null);

//This is used for <900 && > 600
function adjustTop(index,iswidth){
  if(iswidth){
    switch(index){
      case 0:
        return 0;
      case 1:
        return 40;
      case 2 :
        return 0;
      case 3:
        return 40;
      case 4:
        return 0;
      case 5:
        return 40 ;
      default:
        return;
    }
  }else{return 0;}
}

  const handleTab = (e, index) => {

    if (e && index && !isWidth600  ) {
      if (!activate.state && index >0) {
        setActivate({ id: `folder-${index}`, state: true });
        
      } else if(index===0) {
        setActivate({ id: `folder-${0}`, state: true });
      }else{
        setActivate({ id: null, state: false });
      }
    //   setActivate({ id: `folder-${0}`, state: true });
        
    }
  };
  return (
    <CustTab
    top={0}
        left={index*1}
        onClick={(e) => handleTab(e, index)}
        
      >
        <Box
          sx={{
            position: "relative",
            height: { md: "230px", xs: "35px" },
            width: { md: "70px", xs: "150px", sm: "130px" },
            
          }}
        >
          <Typography
            component="h1"
            variant={iswidth ? "h6" :obj.size}
            className={styles.tabName}
          >
            {obj.name}
          </Typography>
        </Box>
      </CustTab>
  )
}

export default Tab