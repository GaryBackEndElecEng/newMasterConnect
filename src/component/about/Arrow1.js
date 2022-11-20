import React from 'react';
import styled from 'styled-components';
import {Paper} from '@mui/material';
import {useTheme} from '@mui/material/styles';

const ArrowMove1 = styled.div.attrs({className:"ArrowMove1"})`
font-size:"68px";
color:"red";
padding:"0";
width:"100%";
height:"auto";
position:absolute;
animation: rotateInf 10s infinite;

@media screen and (max-width:600px){
    font-size:50px;
    @keyframes rotateInf {
        from {
            transform: translateX(-100%) ;
    
          }
        50% {transform: translateX(-50%);
        
            }
        }
        to {
        transform: translateX(0%);
        
        }
    }
}
@media screen and (min-width:600px){
    font-size:78px;
    transform: rotate(25deg);
    @keyframes rotateInf {
        from {
            transform: translateX(-100%) rotate(-25deg);
    
          }
    
        to {
        transform: translateX(0%) rotate(-25deg);
        
        }
    }
}

`;


const Arrow1 = () => {
  return (
    <Paper elevation={0} component="div"
    sx={{display:"flex",
    justifyContent:"center",alignItems: "center",
    flexDirection:"column", width:"10%",
    position:"absolute",top:{sm:"26%",xs:"32%"},left:{sm:"12%",xs:"13%"},
    background:"transparent",
    transform:"rotate(-130deg)"
        }}
    >
        
        <ArrowMove1>
        <i className="fa fa-long-arrow-left" style={{color:"red",padding:"0",width:"100%",height:"auto"}}></i>
        </ArrowMove1>
        </Paper>
  )
}

export default Arrow1

//{sm: "rotate(-160deg)",sx:"rotate(-200deg)"}