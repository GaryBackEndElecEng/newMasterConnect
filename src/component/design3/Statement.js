import React from 'react';
import { Stack, Grid, Typography, CardMedia, Fab, Container, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';

const MainStatement=styled(Stack)`
color:${({color})=>color};
padding:1rem;
width:90%;
display:flex;
flex-direction:column;
align-items:flex-start;
justify-content:flex-start;
box-shadow:1px 2px 10px 10px white;
opacity:1;
animation: showStatement 2s ease-in-out;
@keyframes showStatement {
    from {opacity:0; transform:translateY(100%);}
    to {opacity:1;transform:translateY(0%);}
}
@media screen and (max-width:900px){
    width:100%;
}

`;
const Statement = () => {
    const theme=useTheme();
    return (
        <MainStatement direction={"column"} 
        color={theme.palette.secondary.main}
        >
            <Paper elevation={20} sx={{ background: "transparent", color: theme.palette.secondary.main, borderRadius: "10%" }}>
                <Typography component="h1" variant="h4" sx={{ background: theme.palette.common.fadeCharcoal, padding: "0.5rem" }}>
                    So you want to travel to
                </Typography>
            </Paper>
            <Paper elevation={20} sx={{ background: "transparent", color: theme.palette.secondary.main, borderRadius: "10%" }}>
                <Typography component="h1" variant="h1" sx={{ background: theme.palette.common.fadeCharcoal, padding: "0.5rem" }}>
                    SPACE
                </Typography>
            </Paper>
            <Paper elevation={20} sx={{ background: "transparent", color: theme.palette.secondary.main, borderRadius: "10%", width: { lg: "100%", md: "70%", sm: "60%", xs: "50%" } }}>
                <Typography component="h1" variant="h6" sx={{ width: "100%%", background: theme.palette.common.fadeCharcoal, padding: "0.5rem" }}>
                    The unkown to explore! Enter the outer space and feel its aw of emptiness. Sit back, and relax - allow us to dazzle you with a truly out of the world experience.
                </Typography>
            </Paper>
        </MainStatement>
    )
}

export default Statement