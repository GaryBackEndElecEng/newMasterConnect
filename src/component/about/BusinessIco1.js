import React from 'react'
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import {Paper,Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {purple} from  '@mui/material/colors';
import styled from 'styled-components';

const CusPaper = styled(Paper)`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
width:10%;
position:absolute;
top:75%;
left:2%;
border-radius:50%;
background:transparent;


`;



const BusinessIco1 = () => {
    const theme=useTheme();
  return (
    <CusPaper elevation={10}  component="div"
   sx={{borderRadius:"50%"}}
    >
        <Paper
        sx={{position:"absolute", top:"0%",}}
        >
            <Typography component="h1" variant="h5" sx={{padding:"0 5px",fontSize:{xs:"14px",sm:"22px"}}}>Business</Typography>
        </Paper>
        <Paper elevation={10}  component="div"sx={{borderRadius:"50%",}}>
        <EmojiTransportationIcon 
        sx={{fontSize:{xs:"75px",sm:"100px"},color:purple[600],width:"120px",padding:"0 auto"}}
        /></Paper></CusPaper>
  )
}

export default BusinessIco1