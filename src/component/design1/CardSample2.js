import React, { useRef } from 'react'
import { useTheme } from '@mui/material/styles';
import { Paper, Typography, Stack, Avatar, Card, CardContent } from '@mui/material';
import styled from 'styled-components';
import { GlobalCardDiv1, GlobalCardContent1 } from '../../styled/Global.styled'
import ArchitectureIcon from '@mui/icons-material/Architecture';
import CommentIcon from '@mui/icons-material/Comment';
import Stars from '../design4/Stars';

const GlobalPaper = styled.div.attrs({className:"GlobalPaper"})`

box-shadow: 1px 2px 3px grey;
background:rgba(255,0,0,0.1);

`;
const CardSample2 = ({ fade,rating,name,comment }) => {
    const theme = useTheme();
    return (
        
        <Paper elevation={10} element={<Card/>} sx={{ background: "rgba(255,0,0,0.1)", opacity: fade, transform: `scale(${fade})`, textAlign: "center", maxWidth: "100%" }}>
            
                <Stack direction={"row"} sx={{ alignSelf: "flex-start", justifySelf: "center", alignItems: "center" }} spacing={1}>
                    <Avatar sx={{ alignSelf: "flex-start" }} src="https://images.unsplash.com/photo-1655666002284-096ecc672528?crop=fit&w=300&h=300" alt="www.master-connect.ca" />
                    <CommentIcon sx={{color:"red"}}/>
                    <Paper component="div" elevation={3} sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <Typography component="h1" variant="h5"> {name}</Typography>
                    <Stars rating={rating} />
                    </Paper>
                </Stack>
                <Paper  elevation={10} element={<CardContent/>} sx={{background:"transparent"}}>
                    <Typography component="h1" variant="h6" className="cardContent" style={{ width: `${fade * 300}px`, color: "white", padding:"0.5rem" }}>
                        {comment}
                    </Typography>
                </Paper>
            
        </Paper>
    )
}

export default CardSample2