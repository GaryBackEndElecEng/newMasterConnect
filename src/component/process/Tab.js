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
const getFontSize=window.innerWidth < 900 ? "h6":"h4";

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

    if (e && index  && !isWidth600  ) {
      
      switch (activate.state){
        case (!activate.state && index >0):
          setActivate({id: `folder-${index}`, state: true});
          break;
        case (activate.state && index >0 && activate.id !== `folder-${index}`):
          setActivate({id: null, state: false});
          setTimeout(()=>{
            setActivate({id: `folder-${index}`, state: true});
          },0);
          break;
          case (activate.state && activate.id === `folder-${index}`):
            setActivate({ id: `folder-${0}`, state: true });
          break;
          default:
            setActivate({ id: `folder-${0}`, state: true });
            return;
      }
        
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
            height: { md: "290px", xs: "35px" },
            width: { md: "70px", xs: "150px", sm: "130px" },
            
          }}
        >
          <Typography
            component="h1"
            variant={getFontSize}
            className={styles.tabName}
          >
            {obj.title}
          </Typography>
        </Box>
      </CustTab>
  )
}

export default Tab