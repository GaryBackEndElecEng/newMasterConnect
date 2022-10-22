import React, { useRef, useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import Sketch from "react-p5";
import { GeneralContext } from '../../context/GeneralContextProvider';

const TypographyCustom = styled(Typography)`
display:${({ display }) => display};
justify-content:flex-start;
align-items:center;
flex-direction:row;
animation: appear1 1.5s ease-in;
@keyframes appear1 {
    from { opacity:0;
    transform:translateX(-25%);
    }
    to{opacity:1;
        transform:translateX(0%);
    }
}
`;
const CustomBox = styled(Box)`
opacity:${({ opacity }) => opacity}
display:${({ display }) => display};
animation: appear 1.5s ease-in;
@keyframes appear {
    from { opacity:0;
    transform:translateX(55%);
    }
    to{opacity:1;
        transform:translateX(0%);
    }
}
`;
const DrawSignature = () => {
    let x = 60;
    let y = x * 1.2;
    const { turnOn, setTurnOn, stopP5Contact, setStopP5Contact } = useContext(GeneralContext);
    const showBlock = stopP5Contact ? "block" : 'none';
    const showBlock2 = turnOn ? "block" : "none";
    const opacity = turnOn ? 1 : 0;
    // console.log("turnON",turnOn,"stopP5",stopP5)
    setTimeout(() => {
        if (!turnOn) {
            setTurnOn(true);
        }
    }, 3000);

    const setup = (p5, canvasParentRef) => {
        if (!stopP5Contact) {
            p5.noFill();
            p5.frameRate(15);
            p5.createCanvas(x, y).parent(canvasParentRef);
        }
    }


    const draw = (p5) => {
        if (!stopP5Contact) {
            // Define the curve points as JavaScript objects
            let points = {
                cpx1: 5, cpy1: 46, cpx2: 15, cpy2: 6, x1: 20, y1: 56,
                cpx3: 26, cpy3: 6, cpx4: 52, cpy4: 16, x2: 36, y2: 56,
                cpx5: 46, cpy5: 16, cpx6: 69, cpy6: 6, x3: 52, y3: 56,
                cpx7: 55, cpy7: 68, cpx8: 60, cpy8: 62, x4: 59, y4: 56,
            }
            // console.log(p5.isLooping())
            if (p5.frameCount / 10 < 2) {
                p5.beginShape();
                p5.stroke(255, 0, 0);
                p5.vertex(0, 26); //first point
                p5.bezierVertex(points.cpx1, points.cpy1, points.cpx2, points.cpy2, points.x1, points.y1);
                p5.endShape();
            }
            if (p5.frameCount / 10 > 2 && p5.frameCount / 10 <= 3) {
                p5.beginShape();
                p5.stroke(55, 0, 255);
                p5.vertex(20, 56); //2nd point
                p5.bezierVertex(points.cpx3, points.cpy3, points.cpx4, points.cpy4, points.x2, points.y2);
                p5.endShape();
            }
            if (p5.frameCount / 10 > 3 && p5.frameCount / 10 <= 4) {
                p5.beginShape();
                p5.stroke(0, 255, 0);
                p5.vertex(36, 56); //3rd point
                p5.bezierVertex(points.cpx5, points.cpy5, points.cpx6, points.cpy6, points.x3, points.y3);
                p5.endShape();
            }
            if (p5.frameCount / 10 > 4 && p5.frameCount / 10 <= 5) {
                p5.beginShape();
                p5.stroke(0, 255, 0);
                p5.vertex(51, 56); //4th point
                p5.bezierVertex(points.cpx7, points.cpy7, points.cpx8, points.cpy8, points.x4, points.y4);
                p5.endShape();
                p5.noLoop();
                if (!p5.isLooping()) {
                    setStopP5Contact(true);
                    setTurnOn(true)
                }
            }
        }

    }

    return (

        <Stack direction="row" spacing={3}>
            {turnOn && <Sketch setup={setup} draw={draw} style={{ margin: "auto 0" }} />}
            {turnOn ?
                <Grid container spacing={1}>
                    <Grid item xs={6} md={6}>
                        <TypographyCustom display={showBlock} component="h1" variant="h2" sx={{ fontFamily: "Tangerine", fontSize: { xs: "36px", sm: "36px", md: "46px" },marginTop:{xs:"2rem",sm:"",md:""} }} >
                            aster-connect
                            <Typography style={{ fontFamily: "Playfair Display", paddingBottom: "0.25rem", paddingTop: "0", fontSize: { xs: "12px", sm: "12px", md: "" },marginTop:{xs:"1rem",sm:""} }}>Digital Master Connect</Typography>
                        </TypographyCustom>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <CustomBox display={showBlock2} opacity={opacity}
                            sx={{
                                borderLeft: "2px solid red", margin: "auto 30px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "left", marginRight:{xs:"0.5rem",sm:"2rem",md:"4rem",ld:"4rem"}, boxShadow: "-1px -2px 10px black,1px 2px 10px black",marginTop:{xs:"1rem", sm:"1rem",md:"1rem"},width:{xs:"100%",sm:"50%",md:"100%"}
                            }}
                        >
                            <Typography component="h1" variant="h4" sx={{ fontSize: "20px", paddingLeft: " 1rem", paddingRight: "1rem", }}>
                                The
                            </Typography>
                            <Typography component="h1" variant="h4" sx={{ fontSize: "20px", paddingLeft: " 1rem", paddingRight: "1rem", }}>
                                Creative
                            </Typography>
                            <Typography component="h1" variant="h4" sx={{ fontSize: "20px", paddingLeft: " 1rem", paddingRight: "1rem", }}>
                                Momentum
                            </Typography>
                        </CustomBox>
                    </Grid>
                </Grid>
                : <></>}

        </Stack>

    )
}

export default DrawSignature