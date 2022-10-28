import React from 'react';
import {CardMedia, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useTheme } from '@mui/material/styles';

const RightDesign = () => {
    const theme = useTheme();
    const url = "https://images.unsplash.com/photo-1656381428168-0b782534259e?crop=entropy&h=350&fm=jpg";

    return (
        <Container maxWidth="xl">
            <Grid container spacing={{xs:0,sm:1,md:4}} sx={{justifyContent:"space-between",alignItems:"flex-start"}}>
                <Grid item xs={12} md={6}  sx={{ position: "relative", margin: "auto", textAlign: "center" }}>
                    <Typography component="h1" variant="h3" sx={{ width: "100%", margin: "1rem 0.5rem", fontFamily: `'Edu TAS Beginner', cursive` }}>
                        Imaginary
                    </Typography>
                    <CardMedia component="img" src={url} sx={{ width: "100%", boxShadow: `3px -3px 3px ${theme.palette.background.main} ` }} />
                    <Typography component="div" variant="body1" sx={{ width: "100%", margin: "2rem 0.5rem", fontFamily: `'Edu TAS Beginner', cursive`,fontSize:{xs:"120%",sm:"180%"} }}>
                        Imagery is defined by the mind and then projected onto a canvas of life.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}  sx={{ position: "relative", margin: "auto", textAlign: "center" }}>
                    <Typography component="h1" variant="h3" sx={{ width: "100%", margin: "1rem 0.5rem", fontFamily: `'Edu TAS Beginner', cursive` }}>
                        Curious
                    </Typography>
                    <CardMedia component="img" src="https://source.unsplash.com/random/" sx={{ width: "100%", boxShadow: `3px -3px 3px ${theme.palette.background.main} ` }} />
                    <Typography component="div" variant="body1" sx={{ width: "100%", margin: "2rem 0.5rem", fontFamily: `'Edu TAS Beginner', cursive`,fontSize:{xs:"120%",sm:"180%"} }}>
                        Curious is premised on the need to be revealed.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}  sx={{ position: "relative", margin: "auto", textAlign: "center" }}>
                    <Typography component="h1" variant="h3" sx={{ width: "100%", margin: "1rem 0.5rem", fontFamily: `'Edu TAS Beginner', cursive` }}>
                        Adrenaline
                    </Typography>
                    <CardMedia component="img" src="https://images.unsplash.com/photo-1657987273071-fbe77b5b4e90?crop=entropy&h=900" sx={{ width: "100%", boxShadow: `3px -3px 3px ${theme.palette.background.main} ` }} />
                    <Typography component="div" variant="body1" sx={{ width: "100%", margin: "2rem 0.5rem", fontFamily: `'Edu TAS Beginner', cursive`,fontSize:{xs:"120%",sm:"180%"} }}>
                        Adrenaline is derived from bordering the feeling of life with the fear of death.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}  sx={{ position: "relative", margin: "auto", textAlign: "center" }}>
                    <Typography component="h1" variant="h3" sx={{ width: "100%", margin: "1rem 0.5rem", fontFamily: `'Edu TAS Beginner', cursive` }}>
                        Ponderance
                    </Typography>
                    <CardMedia component="img" src="https://images.unsplash.com/photo-1657480194308-7752db5e21f0?crop=entropy&w=600&h=900&fm=jpg" sx={{ width: "100%", boxShadow: `3px -3px 3px ${theme.palette.background.main} ` }} />
                    <Typography component="div" variant="body1" sx={{ width: "100%", margin: "2rem 0.5rem", fontFamily: `'Edu TAS Beginner', cursive`,fontSize:{xs:"120%",sm:"180%"} }}>
                        Ponderance is wondering about what could be with what can be.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default RightDesign