import React, { useContext, useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { Grid, Container, Typography, Stack, Fab, Card, Box, CardMedia } from '@mui/material';
import CoverPage from './CoverPage';
import styled from 'styled-components';
import DiscountIcon from '@mui/icons-material/Discount';
import Description from './Description';
import Summary from './Summary';
import Products from './Products';

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
    const { special, setChangePage, setTitle, setStyleName,staticImage } = useContext(GeneralContext);
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
            <Container maxWidth="xl" sx={{ margin: "1rem auto" }}>
                <Grid container spacing={{ xs: 0, sm: 1 }}>
                    {getPackages.loaded && getPackages.data.map((obj, index) => (
                        <Grid item xs={12} sm={6} md={4} key={`${obj.id}--packages-${index}`}>
                            <Card elevation={3} sx={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "flex-start", padding: "0.5rem" }}>
                                <CardMedia component="img" src={`${staticImage}/${obj.image}`} height="100px" alt="www.master-connect.ca"/>
                                <Typography component="h1" variant="h3" sx={{ margin: "1rem auto" }}>{obj.name}</Typography>
                                <Summary obj={obj} title={"summary"}/>
                                <Description obj={obj} title={"description"}/>
                                {/* PRODUCT SECTION */}
                                
                                <Products mainProduct={obj.products[0]} package1={obj} title={obj.name} staticImage={staticImage}/>
                                {/* PRICE SECTION */}
                                <Stack direction={{sm:"row",xs:"column"}} spacing={2} sx={{ alignItems: "center", justifyContent: "center", margin: "auto", padding: " 0.25rem", boxShadow: "1px 1px 15px 5px grey", width: "100%", }}>
                                    <Typography component="h1" variant="body1" sx={{ margin: "1rem auto" }}>reg: $
                                        <span style={{ textDecoration: "line-through" }}>{obj.monthly}</span>
                                        <sup>00</sup>
                                    </Typography>
                                    <Box>
                                        <Typography component="h1" variant="body1" sx={{ margin: "1rem auto" }}>
                                            <span style={{ color: "blue" }}>reduced: </span><DiscountIcon sx={{ ml: 1, mr: 1, color: "red" }} /><span style={{ color: "green" }}>$</span>
                                            <span style={{ fontWeight: "bold" }}>
                                                {reducePerc(obj.monthly, obj.reducePerc).price2}<sup>{reducePerc(obj.monthly, obj.reducePerc).num2}</sup>
                                            </span>
                                            <span style={{ fontWeight: "bold", margin: "0 0.5rem" }}>
                                                {obj.reducePerc} % - off
                                            </span>
                                        </Typography>
                                    </Box>

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
    let num = price
    let price2 = Math.floor(num * (1 - reducePerc / 100))
    let num2 = Math.floor((num * (1 - reducePerc / 100) - price2) * 100)
    let main = { price2: price2, num2: num2 }
    return main
}