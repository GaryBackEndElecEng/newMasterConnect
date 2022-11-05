import React, { useContext, useEffect, useState, } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Container, Stack, Grid, Typography, Card, Avatar, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Stars from './Stars';
import styled from 'styled-components';

const MainPageRating=styled.div`
margin: 1rem auto;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
background:${({bg})=>bg};
width:100vw;
@media screen and (max-width:900px){
    
}
@media screen and (max-width:600px){

}
`;
const PageRatings = () => {
    const theme = useTheme();
    const { pageRatings, } = useContext(GeneralContext);
    const [filterRating,setFilterRating]=useState([]);
    const logo = "https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png";

    useEffect(()=>{
        if(pageRatings.loaded && pageRatings.data){
            let filtered=pageRatings.data?.filter(obj=>(parseInt(obj.rating) > 2));
            setFilterRating(filtered);
        }

    },[pageRatings.loaded,pageRatings.data]);

    return (
        <MainPageRating 
        bg={theme.palette.common.darkBlue}
        >
            <Typography component="h1" variant="h4" sx={{textAlign:"center",margin:"1rem auto"}}>Client comments</Typography>
            <Grid container spacing={{ xs: 0, sm: 1, md: 2 }}
            sx={{maxHeight:{md:"30vh",xs:"50vh"},overflowY:"scroll"}}
            >
                {filterRating && filterRating.map((obj, index) => (
                    <Grid item xs={6} sm={4} md={2} key={`${obj.id}-${index}`} sx={{padding:"1rem"}}>
                        <Card elevation={10} sx={{padding:"1rem", borderRadius:"10%",backgroundColor:theme.palette.common.lighter}}>
                            <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>
                                {obj.name}
                            </Typography>
                            <Stack direction={{xs:"column",sm:"column",md:"row"}} spacing={2}>
                            <Avatar src={logo} alt="www.master-connect.ca" sx={{ width: { sm: "25%", xs: "25%", md: "25%" }, height: { sm: "25%", xs: "25%", md: "25%" }, boxShadow: `1px 1px 10px 8px ${theme.palette.common.blueFade}` }} />
                            <Stars rating={obj.rating} sx={{ml:1}}/>
                            </Stack>
                            <CardContent
                                sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}
                            >
                                <Typography component="h1" variant="h6">
                                    page:{obj.page}
                                </Typography>
                                <Typography component="h1" variant="h6">
                                    comment
                                </Typography>
                                <Typography component="h1" variant="body1">
                                    {obj.comment}
                                </Typography>
                            </CardContent>
                        </Card>

                    </Grid>
                ))}
            </Grid>

        </MainPageRating>
    )
}

export default PageRatings