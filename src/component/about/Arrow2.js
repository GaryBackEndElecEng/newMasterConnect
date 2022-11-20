import React from 'react'
import {Paper} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import styled from 'styled-components';

const ArrowMove2 = styled.div.attrs({className:"ArrowMove1"})`
font-size:"68px";
color:"red";
padding:"0";
width:"100%";
height:"auto";
position:absolute;
animation: rotateInf2 10s infinite;


@media screen and (max-width:600px){
    font-size:50px;
    
    @keyframes rotateInf2 {
        from {
            transform: translateX(-100%);
    
          }
        50% {transform: translate(-50%);
        
            }
       
        to {
        transform: translate(0%);
        
        }
    }
}
@media screen and (min-width:600px){
    font-size:78px;
    transform: rotate(45deg);
    @keyframes rotateInf2 {
        from {
            transform: translateX(-100%) rotate(25deg);
    
          }
       
        to {
        transform: translate(0%) rotate(25deg);
        
        }
    }
}

`;


const Arrow2 = () => {
    
  return (
    <Paper elevation={0}  component="div"
    sx={{display:"flex",
    justifyContent:"center",alignItems: "center",
    flexDirection:"column", width:"10%",
    position:"absolute",top:"66%",left:"12%",
    background:"transparent",
    transform: "rotate(-225deg)"
        }}
    >
        
        
        <ArrowMove2><i className="fa fa-long-arrow-left" style={{color:"red",padding:"0",width:"100%",height:"auto"}}></i></ArrowMove2>
        </Paper>
  )
}

export default Arrow2