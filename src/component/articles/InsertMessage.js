import React, {useState,useEffect} from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';

const InsertContainer=styled.div`
width:90%;
position:absolute;
top:90%;
font-size:30px;
color:white;
left:3%;
background:${({bg})=>bg};
animation: slideIn 2s ease-in-out;
@keyframes slideIn {
    from { opacity:0.3;transform:translateX(-100%);}
    to { opacity:1;transform:translate(0%);}
}
@media screen and (max-width:900px){
    top:75%;
    width:100%
    font-size:22px;
    padding:0px;
}
@media screen and (max-width:600px){
    top:65%;
    width:100%;
    font-size:20px;
    left:0%;
}

`;

const InsertMessage = ({message}) => {
    const theme=useTheme();
    const [ timer,setTimer]=useState(false);

    useEffect(()=>{
        setTimeout(()=>{
            setTimer(true)
        },2000)
    },[])

  return (
    <>
    {timer && <InsertContainer bg={theme.palette.common.background2}  >{message}</InsertContainer>}
    </>
  )
}

export default InsertMessage