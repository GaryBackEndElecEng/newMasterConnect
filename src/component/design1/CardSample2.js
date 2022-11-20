import React from 'react'
import { Paper, Typography, Stack, Avatar, Card, CardContent } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import Stars from '../design4/Stars';

const CardSample2 = ({ fade,rating,name,comment }) => {
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