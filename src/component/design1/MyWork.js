import React from 'react'
import { Avatar, Fab, CardMedia, CardContent, Typography, Card, Box, Stack, Paper, Divider, Container, CardActions } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useTheme } from '@mui/material/styles';
import Project from './Project';
import styled from 'styled-components';
import {grey} from '@mui/material/colors';

const GlobalCardDiv2 = styled.div.attrs({className:"GlobalCardDiv2"})`
background:${grey[50]};
color:${({color})=>color};
width:${({width})=>width};
display:flex;
flex-wrap:nowrap;
justify-content:space-between;
align-items:flex-start;
gap:5px;
padding:0.5rem 1rem;

@media screen and (max-width:500px){
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    gap:10px;
    padding:0.25rem 0.5rem;
}

`;

const MyWork = ({lang}) => {
    const image = "https://images.unsplash.com/photo-1663327165437-5dbcfbdc29b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2MzYxMjE1Nw&ixlib=rb-1.2.1&q=80&w=1080"
    const imgWidth = "15vw";
    const imgHeight = imgWidth;
    const theme = useTheme();
    return (
        <Container maxWidth={"xl"}>
            <Card variant="outLine" sx={{ maxWidth: "100%", padding: "0.5rem", background: theme.palette.splash, color: theme.palette.common.light,display:"flex",flexDirection:"column",alignItems:"center" }}>
                <Typography component="h1" variant="h3" sx={{background:theme.palette.common.background2,padding:"0.5rem"}}> Projects</Typography>
                <Divider sx={{border:"2px solid black",width:"50%"}}/>
                <GlobalCardDiv2 color={theme.palette.common.dark} width={'100%'}>
                    <CardMedia component={"img"} src={`${image}&w=${imgWidth}&h=${imgHeight}`} sx={{ borderRadius: { sm: "50%", xs: "15%" }, border: "2px solid black", width: { sm: imgWidth, xs: "100%" }, height: { xs: "40vh", sm: imgHeight } }} />

                    <CardContent>
                        <Project lang={lang}/>
                        <CardActions sx={{ display:"flex",justifyContent:"center"}}>
                            <Fab variant="extended" color="primary" aria-label="explore">
                                <NavigationIcon sx={{ mr: 2, color: theme.palette.secondary.main }} />
                                Explore
                            </Fab>
                        </CardActions>
                    </CardContent>

                </GlobalCardDiv2>
            </Card>
        </Container>
    )
}

export default MyWork