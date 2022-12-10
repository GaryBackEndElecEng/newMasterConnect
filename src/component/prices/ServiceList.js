import React from 'react';
import { Stack, Grid, Typography, Paper } from '@mui/material';
import styled from 'styled-components';
import {useTheme} from '@mui/material/styles';


const CustStack = styled(Stack)`
position:absolute;
margin:auto;
top:-0%;
width:100%;
padding:0.5rem;
background:${({bg})=>bg};
z-index:9999;
height:60vh;
overflow-y:scroll;
justify-content:flex-start;
animation: growIn 1.5s ease-in-out;
@keyframes growIn {
    from {transform:scale(0);}
    to {transform:scale(1);}
}
@media screen and (max-width:900px){
    top:0%;
    height:50vh;
}

@media screen and (max-width:600px){
    @keyframes growIn {
        from {transform:scale(0);}
        to {transform:scale(1) translateY(-15%);}
    }

    top:25%;
    height:auto;
    max-height:50vh;
    transform:translateY(-15%);
}
@media screen and (max-width:400px){
    top:15%;
    max-height:75vh;
    left:2%;
    width:100%;
}

`;
const ServiceList = ({ services, postServices,activate }) => {
const display = activate ? "block":"none";
const theme=useTheme();
    return (
        <CustStack
            direction="column"
            bg={theme.palette.common.blueGrey}
            spacing={{ xs: 0, sm: 1 }}
            sx={{ justifyContent: "flex-start", alignItems: "center",display:display ,}}
        >
            <Typography component="h1" variant="h4" sx={{textAlign:"center",margin:"1rem auto",color:"white"}}>Recommended requirments</Typography>
            <Grid container spacing={{ xs: 0, sm: 0 }} sx={{justifyContent:"flex-start"}}>
                {services.map((obj, index) => (
                    <Grid item xs={12} key={`${obj.id}-service-${index}`} sx={{margin:"0.25rem auto"}}>
                        <Paper elevation={10} sx={{ margin: "auto", padding: "0.5rem" }}>
                            <Typography component="h1" variant="h5"
                                sx={{ fontWeight: "bold" }}
                            >
                                {obj.name}
                            </Typography>
                            <Typography component="h1" variant="body2">{obj.summary}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={{ xs: 0, sm: 0 }} >
                {postServices.map((obj, index) => (
                    <Grid item xs={12}  key={`${obj.id}-service-${index}`} sx={{margin:"0.25rem auto"}}>
                        <Paper elevation={10} sx={{ margin: "auto", padding: "0.5rem" }}>
                            <Typography component="h1" variant="h5"
                                sx={{ fontWeight: "bold" }}
                            >
                                {obj.name}
                            </Typography>
                            <Typography component="h1" variant="body1">{obj.summary}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

        </CustStack>
    )
}

export default ServiceList