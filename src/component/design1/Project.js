import React,{useEffect, useState} from 'react';

import { Box, Stack, Grid, Typography,  Paper, CardMedia, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const array =[
    {id:0,title:"Our Services",content:"This describes the services, provided by the establishment?"},
    {id:1,title:"Supplemental",content:"This can dscribe to the client your supplemental services that you provide "},
    {id:2,title:"Future Growth",content:"This may decribe to your audience, your future growth on purchasing additional rentals."},
    {id:3,title:"Complementary",content:"This may describe Complementary rewards and gifts for registered gold-line clients."},]
const arrayFr =[
    {id:0,title:"Nos services",content:"Cela décrit les services, fournis par l'établissement?"},
    {id:1,title:"Supplémentaire",content:"Cela peut décrire au client vos services supplémentaires que vous fournissez "},
    {id:2,title:"Croissance future",content:"Cela peut décrire à votre public votre croissance future en achetant des locations supplémentaires."},
    {id:3,title:"Complémentaire",content:"Cela peut décrire des récompenses et des cadeaux complémentaires pour les clients Gold Line enregistrés."},]

const Project = ({lang}) => {
    const theme=useTheme();
    const image1="https://images.unsplash.com/photo-1657657871261-2b40053ad9c2?crop=entropy&w=300&h=300";
    const [changelang,setChangelang]=useState([]);
    useEffect(()=>{
        if(lang===true){
            setChangelang(arrayFr);
        }
        if(lang===false){
            setChangelang(array)
        }
    },[lang])
    return (
        <Grid container spacing={0} >
            {changelang.map(obj=>(
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