import React, { useContext, useEffect, useState, useRef, } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, CardMedia, Container, Fab, Grid, Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import styles from './works.module.css';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

const MySummary = styled(Container)`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
flex-direction:column;
margin: 2rem auto;
box-shadow:1px 1px 3px 5px ${({bs})=>bs};
`;
const MyPaper=styled(Paper)`
position:absolute;
top:30%;
left:1%;
height:300px;
width:90%;
animation: growUp 1s ease-in-out;
@keyframes growUp {
    from {opacity:0;height:0px;}
    to{opacity:1;}
}
@media screen and (max-width:900px){
    width:95%;
    top:50%;
    height:220px;
}

`;
const Summary = ({summary}) => {
    const theme=useTheme();
    const MyRef=useRef(null);
   const [display,setDisplay]=useState(false)

   const handleMouseOver=()=>{
    
    setDisplay(true);
   }
   const handleMouseOut=()=>{
    setDisplay(false);
   }

  return (
    <MySummary maxWidth="md" ref={MyRef} sx={{display:"block"}} bs={theme.palette.common.blueGrey}
    onMouseOver={()=>handleMouseOver()} onMouseOut={()=>handleMouseOut()}

    >
        <Fab variant="extended" color={theme.palette.common.blueGrey}>
        <Typography component="h1" variant="h6">Read More </Typography>
        <MarkUnreadChatAltIcon sx={{ml:1,color:theme.palette.common.blueGrey}}/>
        </Fab>
        { display &&
         <MyPaper elevation={10}
        
        sx={{boxShadow:"1px 1px 3px 6px grey",padding:"0.5rem",}} >
            <Typography component="h1" variant="h4"
            sx={{color:theme.palette.common.mediumBlue,}}
            >
                Summary
            </Typography>
            <Box sx={{fontSize:{xs:"auto",sm:"22px",md:"18px"}}}>
            {summary}
            </Box>
            
            </MyPaper>}
    </MySummary>
  )
}

export default Summary