import React, { useContext } from 'react'
import {  Stack, Container, Paper, Grid, Typography, CardMedia, Fab } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { theme } from '../../context/theme';
import styled from 'styled-components';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';

const CustomContainer = styled(Container)`
background-image:url(${({ bg }) => bg});
background-size:100% 100%;
width:100%;
margin:0;
padding:0px;

@media screen and (max-width:900px){
margin:0.5rem -20px;
}
`;

const ImageDisplay = () => {
    const { staticImage } = useContext(GeneralContext);

    const array = [
        { id: 0, title: " The Earth", content: "The Earth's atmosphere is an extremely thin sheet of air extending from the surface of the Earth to the edge of space. The Earth is a sphere with a roughly 8000 mile diameter; the thickness of the atmosphere is about 60 miles or 0.2% of the earth's thickness.", image: `${staticImage}/earth.png` },
        { id: 1, title: " Jupiter", content: "Jupiter is so big that all the other planets in the solar system could fit inside it. More than 1,300 Earths would fit inside Jupiter. Jupiter is the fifth planet from the sun", image: `${staticImage}/jupiter.png` },
        { id: 2, title: " Earth in solitude", content: "The diameter of the Solar System is 100000 times the distance from the Sun to the Earth. Light,from the Sun would take about 555 days to reach the edge of the Solar System compared to 8.25 minutes to reach the Earth", image: `${staticImage}/earthMoon.png` },
        { id: 3, title: " Our nearest Neighboor", content: "The Voyager 1 spacecraft is on an interstellar mission. It is traveling away from the Sun at a rate of 17.3 km/s. If Voyager were to travel to Proxima Centauri, at this rate, it would take over 73,000 years to arrive. If we could travel at the speed of light, it would still take 4.22 years to arrive,looking outside the space craft - Inside the craft, it would take an instance.", image: `${staticImage}/neighborStar.png` },
    ]
    const dottedWorld = `${staticImage}/dottedWorld.png`;
    return (
        <CustomContainer maxWidth="xl" bg={dottedWorld} sx={{ position: "relative", borderTop: "2px solid white" }}>
            <Typography component="h1" variant="h3"
                sx={{ width: "100%", textAlign: "center", margin: " 2rem auto" ,color:"white"}}
            >
                About our Solar Sytem
            </Typography>
            <Grid container spacing={0} sx={{margin:{xs:"1rem 0px",md:"1rem 10px"},padding:{xs:"0px"}}}>
                {array.map(obj => (
                    <Grid item xs={12} md={6} lg={4} key={obj.id} sx={{ padding: "1rem",fontFamily:"Roboto" }}>
                        <Paper elevation={10} sx={{padding:"0.5rem",width:"100%",boxShadow:`1px 2px 10px 10px ${theme.palette.common.blueGrey}`,}}>
                            <Stack direction={{ xs: "column" }} spacing={{xs:1,md:2}}>
                                <Stack direction={"column"} spacing={0}>
                                    <Typography component="h1" variant="h4">{obj.title}</Typography>
                                    <Typography component="h1" variant="h6">{obj.content}...</Typography>
                                </Stack>
                                <CardMedia component="img" image={obj.image} alt="www.master-connect.ca" 
                                sx={{
                                    //  aspectRatio: "16/9",
                                     width:{xs:"100%",xl:"100%"},
                                    //  overflowY:"scroll",
                                     padding:"0px"
                                    }}
                                      />
                            </Stack>
                            <Stack direction="column"
                                sx={{
                                    display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                                    margin: "1rem auto"
                                }}>
                                <Fab variant="extended" color="secondary" sx={{ margin: "auto" }}>
                                    view details <SatelliteAltIcon sx={{ ml: 2, color: "aqua" }} />
                                </Fab>
                            </Stack>
                        </Paper>

                    </Grid>
                ))}

            </Grid>
        </CustomContainer>
    )
}

export default ImageDisplay