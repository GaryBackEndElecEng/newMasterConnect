import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';



const CusBox = styled(Box)`
width:100%;
position:relative;
margin:2rem auto;
animation: grow 1.5s ease-in-out;
@keyframes grow {
    from { opacity:0;transform:scale(0);}
    to{opacity:1;transform:scale(1);}
}
`;
const RevealPrice = () => {
    const { staticImage } = useContext(GeneralContext);
    const { priceCatelog, getServerPrice, setGetServerPrice,startingPrices } = useContext(PriceContext);
    const theme = useTheme();


    useEffect(() => {
        const basePrice2 = priceCatelog.loaded && priceCatelog.data !== null ? priceCatelog.data.filter(obj => (obj.id === 1))[0].priceName : null;
        if (basePrice2) {
            setGetServerPrice({ data: basePrice2, loaded: true });
        }
    }, [setGetServerPrice, priceCatelog.loaded, priceCatelog.data])

    return (
        <Container maxWidth="lg" sx={{ position: "relative", minHeight: "10vh" }}>
            <CusBox>
                <Paper elevation={20} component="div" sx={{ margin: "auto", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "1rem", background: theme.palette.splash, color: "white" }}>
                    <Grid container spacing={2}>

                        {startingPrices.loaded && startingPrices.data.map(obj => (

                            <Grid item xs={12} md={6} key={obj.id}>

                                <Typography component="h1" variant="h3"
                                 sx={{ fontfamily: "Roboto", color: theme.palette.common.light, margin: "auto ", fontSize: { xs: "30px", sm: "30px" }, textAlign: "center", fontWeight: "bold", 
                                 }}>
                                    {obj.name}
                                </Typography>

                                <Paper elevation={10}>
                                    <Typography component="h1" variant="body2" 
                                    sx={{ fontfamily: "Roboto", color: theme.palette.common.background, background: theme.palette.common.mediumBlue2, padding: "0.5rem", margin: " 1rem auto ", fontSize: { xs: "30px", sm: "26px" },
                                     }}>
                                        {obj.desc}
                                    </Typography>
                                </Paper>
                                <Stack direction={{xs:"column",md:"row"}} spacing={2} sx={{alignItems:"flex-start",justifyContent:"flex-start",margin:"1rem "}}>

                                    

                                    <Typography component="h1" variant="body2"
                                     sx={{ fontfamily: "Roboto", color: theme.palette.common.background, margin: "  auto ", fontSize: { xs: "20px", sm: "26px" }, borderBottom: "1px solid white", borderTop: "1px solid white",
                                     }}>
                                        <span
                                         style={{ color: "black", textDecoration: "underline", fontWeight: "bold", fontSize: "16px",margin:"0.5rem"
                                          }}>
                                            Base monthly;</span>
                                             ${obj.monthly}.<sup>00</sup> per page - all designs
                                    </Typography>

                                </Stack>
                            </Grid>

                        ))}
                    </Grid>
                </Paper>
            </CusBox>
        </Container>
    )
}

export default RevealPrice