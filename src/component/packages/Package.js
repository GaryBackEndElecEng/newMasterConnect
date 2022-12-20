import React, { useContext, useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { Grid, Container, Typography, Stack, Fab, Card } from '@mui/material';
import CoverPage from './CoverPage';
import styled from 'styled-components';

const MainPackage = styled.div`
width:100vw;
margin-top:0px;
animation: clearIn 1s ease-in-out;
@keyframes clearIn {
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:900px){
    margin-top:0px;
}
@media screen and (max-width:800px){
    margin-top:0px;
}
@media screen and (max-width:400px){
    margin-top:-52px;
}
`;
const Package = () => {
    const { special, setChangePage, setTitle, setStyleName } = useContext(GeneralContext);
    const { getPackages } = useContext(PriceContext);
    useEffect(() => {
        setTitle("Packages");
        setStyleName("packages for you");
        if (window.scrollY) {
            window.scroll(0, 0);
        }
    }, [setTitle, setStyleName]);


    return (

        <MainPackage>
            <CoverPage />
            <Container maxWidth="xl" sx={{margin:"1rem auto"}}>
                <Grid container spacing={{ xs: 0, sm: 1 }}>
                    {getPackages.loaded && getPackages.data.map((obj, index) => (
                        <Grid item xs={12} sm={6} md={4} key={`${obj.id}--packages-${index}`}>
                            <Card elevation={3} sx={{display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"flex-start",padding:"0.5rem"}}>
                                <Typography component="h1" variant="h3" sx={{ margin: "1rem auto" }}>{obj.name}</Typography>

                                <Typography component="h1" variant="body1" sx={{ margin: "1rem auto" }}>{obj.summary}</Typography>
                                <Typography component="h1" variant="body1" sx={{ margin: "1rem auto" }}>{obj.desc}</Typography>
                                <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "center",margin:"auto" }}>
                                    <Typography component="h1" variant="body1" sx={{ margin: "1rem auto" }}>reg:{obj.price}<sup>00</sup></Typography>
                                    <Typography component="h1" variant="body1" sx={{ margin: "1rem auto" }}>reduced{reducePerc(obj.price, obj.reducePerc)}<sup>00</sup></Typography>
                                </Stack>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </MainPackage>
    )
}

export default Package

function reducePerc(price, reducePerc) {
    return price * (1 - reducePerc / 100)
}