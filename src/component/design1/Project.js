import React, { useContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Box, Container, Stack, Grid, Typography, Fab, Paper, CardMedia, Button } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider.js';
import { useTheme } from '@mui/material/styles';
const array =[
    {id:0,title:"Service1",content:"This describes the services, provided by the establishment?"},
    {id:1,title:"Service2",content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repellat explicabo nobis placeat molestias possimus tenetur facere similique quaerat consectetur?"},
    {id:2,title:"Service3",content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repellat explicabo nobis placeat molestias possimus tenetur facere similique quaerat consectetur?"},
    {id:3,title:"Service4",content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repellat explicabo nobis placeat molestias possimus tenetur facere similique quaerat consectetur?"},]

const Project = () => {
    const theme=useTheme();
    const image1="https://images.unsplash.com/photo-1657657871261-2b40053ad9c2?crop=entropy&w=300&h=300";
    return (
        <Grid container spacing={0} >
            {array.map(obj=>(
                <Grid item xs={12} md={6} sm={6} lg={4} key={obj.id} sx={{padding:"0.25rem"}}> 
            <Paper elevation={4} 
            sx={{ padding: "1rem", height: "auto", backgroundImage:`url(${{image1}})`,backgroundSize:"100% 100%"
            }} >

                <Typography component="h1" variant="h4" sx={{ margin: "0.5rem",color:theme.palette.common.darkBlue }}>{obj.title}</Typography>
                <Stack direction={{ md: "row", xs: "column" }} spacing={2} sx={{ margin: { xs: "1rem", sm: "0.5rem" },  alignItems:"flex-start" }}>
                    <CardMedia component="img" src="https://images.unsplash.com/photo-1657657871261-2b40053ad9c2?crop=entropy&w=300&h=300" alt="www.master-connect.ca" sx={{ borderRadius: "5px", width: { xs: "50%", sm: "70%",md:"100%" }, padding: "0.25rem", height: { xs: "50%", sm: "20%" }, margin: { xs: "auto", sm: "" }, alignSelf: "flex-start" }} />
                    <Box>
                        <Typography component="h3" variant="h6" sx={{ textAlign: "left" }}>Description</Typography>
                        <Typography component="h1" variant="body1" sx={{ height: "auto" }}>
                            {obj.content}
                        </Typography>
                    </Box>
                </Stack>
                <Stack direction={"column"} sx={{textAlign:"center"}}>
                <Button variant="contained">Details</Button>
                </Stack>
            </Paper>
            </Grid>
            ))}
        </Grid>
    )
}

export default Project