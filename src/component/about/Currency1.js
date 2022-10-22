import React from 'react'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {Paper} from '@mui/material';
import styled from 'styled-components';

const Currency = styled.div.attrs({className:"currency1"})`
font-size:"68px";
color:"red";
padding:"0";
width:"100%";
height:"auto";
position:absolute;
animation: moveIco 6.5s ease-in infinite;
@keyframes moveIco {
    from {
        transform: rotate(0deg) ;

      }
    to {
    transform: rotate(360deg) ;
    
    }
}

`;
const Currency1 = () => {


return (
    <Paper elevation={0} component="div"
    sx={{display:"flex",
    justifyContent:"center",alignItems: "center",
    flexDirection:"column", width:"10%",
    position:"absolute",top:"8%",left:{xs:"0%",sm:"0%"},
    background:"transparent",
    transform: "rotate(-160deg)"
        }}
    >
        
        <Currency>
        <CurrencyExchangeIcon sx={{ fontSize:{xs:"44px",sm:"52px"},color:"green"}}/>
        </Currency>
        </Paper>
  )

}

export default Currency1