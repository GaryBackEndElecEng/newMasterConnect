import React, {  useState, } from 'react'
import { useTheme } from '@mui/material/styles';
import {  Paper, Typography, Fab, } from '@mui/material';
// import styles from './account.module.css';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

const MyMessage= styled(Paper)`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
background:${({bg})=>bg};
color:white;
position:absolute;
top:30%;
left:auto;
animation: growIn 1.5s ease-in-out;
@keyframes growIn {
    from { opacity:0;}
    to { opacity:1;}
}

`;
const MsgFillOutForm = () => {
    const [close,setClose]=useState(false);
    const theme=useTheme();
  return (
    <>
    { !close && <MyMessage component="div" elevation={15} bg={theme.palette.common.blueGrey}>
        <Typography componenet="h1" variant="h4">Please complete this form to better serve you.</Typography>
        <Fab variant="extended" color={theme.palette.common.blueGrey} onClick={()=>setClose(true)}>
            close <CloseIcon sx={{ml:2,color:"red"}}/>
        </Fab>
    </MyMessage>}
    </>
  )
}

export default MsgFillOutForm