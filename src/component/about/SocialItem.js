import React from "react";
import {
  Card,
} from "@mui/material";
import styles from "./about.module.css";
import styled from "styled-components";



const ShowCardIcon = styled.div`
  margin:auto;
  background:transparent !important;
  transform: translateY(${({ transformy }) => (transformy)}) scale(${({scale})=>scale});
  animation: ${({animation})=>animation};
  @keyframes slideUp {
    from {transform:translateY(0%) scale(1);}
    to {transform:translateY(-15%) scale(1.05);}
  }
  @keyframes slideDown {
    from {transform:translateY(-15%) scale(1.05);}
    to {transform:translateY(0%) scale(1);}
  }
`;
const SocialItem = ({ obj,index }) => {
    const [open,setOpen]=React.useState(null);
    const [match,setMatch]=React.useState({loaded:false,id:null});
    const normal={writingMode:"vertical-rl",position:"absolute",left:"0%",fontSize:"100%",zIndex:"200",top:"0%",color:"blue",transition:"all 1s ease-in-out"};
    const hover={writingMode:null,position:"absolute",left:"0%",fontSize:"120%",zIndex:"200",top:"-10%",color:"black",transition:"all 1s ease-in-out"};
    const changeStyle=match.loaded && match.id === index ? hover :normal;
    const isMatch=(match.loaded && match.id === index ) ? true:null;

    const handleMouseOver=(e,index)=>{
        setOpen(true);
        setMatch({loaded:true,id:index});
        
    }
    const handleMouseOut=()=>{
        setOpen(false);
        setMatch({loaded:false,id:null})
    }
    const handleClick=(e,link)=>{
        e.preventDefault();
        window.open(link);
        
    }
  return (
    
      <ShowCardIcon
        transformy={isMatch ? "-10%" : "0%"}
        scale={isMatch ? "1.05":"1"}
        animation={isMatch ? "slideUp 0.5s linear":"slideDown 0.5s linear"}
        onMouseOver={(e) => handleMouseOver(e, index)}
        onMouseOut={handleMouseOut}
        onClick={(e)=>handleClick(e,obj.link)}
        
      >
        
        {obj.icon}
      </ShowCardIcon>
   
  );
};

export default SocialItem;
