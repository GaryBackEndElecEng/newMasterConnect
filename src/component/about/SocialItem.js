import React from "react";
import {
  Card,
} from "@mui/material";
import styles from "./about.module.css";
import styled from "styled-components";



const ShowCardIcon = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position:relative;
  gap: 10px;
  background:${({match})=>match ? " var(--background-image-2-left)"  :
   " var(--background-image-1-left)"};
  transform: translateY(${({ transformy }) => (transformy)});
  animation: ${({animation})=>animation};
  @keyframes slideUp {
    from {transform:translateY(0%) scale(1);}
    to {transform:translateY(-10%) scale(1.1);}
  }
  @keyframes slideDown {
    from {transform:translateY(-10%) scale(1.1);}
    to {transform:translateY(0%) scale(1);}
  }
`;
const SocialItem = ({ obj,index }) => {
    const [open,setOpen]=React.useState(null);
    const [match,setMatch]=React.useState({loaded:false,id:null});
    const normal={writingMode:"vertical-rl",position:"absolute",left:"0%",fontSize:"100%",zIndex:"200",top:"0%",color:"white",transition:"all 1s ease-in-out"};
    const hover={writingMode:null,position:"relative",left:"0%",fontSize:"110%",zIndex:"200",top:"-10%",color:"blue",transition:"all 1s ease-in-out"};
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
        open={open}
        match={isMatch}
        transformy={isMatch ? "0%" : "-10%"}
        animation={isMatch ? "slideUp 0.75s linear":"slideDown 0.7s linear"}
        elevation={3}
        onMouseOver={(e) => handleMouseOver(e, index)}
        onMouseOut={handleMouseOut}
        onClick={(e)=>handleClick(e,obj.link)}
        
      >
        <small 
        className={(isMatch) ? styles.highlightOn : styles.highlightOff}
        style={changeStyle}
        >
            {obj.name}
        </small>
        {obj.icon}
      </ShowCardIcon>
   
  );
};

export default SocialItem;
