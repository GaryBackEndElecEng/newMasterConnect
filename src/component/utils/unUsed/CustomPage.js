import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { Fab, Stack, Grid, Container, Box, Typography } from '@mui/material';
let lastPosY = 0;
let lastPosX = 0;
let ticking = false;

const MainCustomContainer = styled(Container)`
margin:auto;
margin-top:5px;
border:1px solid blue;
display:flex;
justify-content:center;
align-items:center;
padding:0.5rem;
position:relative;

`;
const MainCustomGrid = styled(Grid)`
margin:auto;
min-height:50vh;
border:1px solid red;
width:100%;

`;
const CustomPage = () => {
    const myRef = useRef();
    const refX = useRef();
    const refY = useRef();
    const { staticImage, setTitle, setStyleName } = useContext(GeneralContext);
    const [getObj, setGetObj] = useState({});
    const [noTick, setNoTick] = useState(false);
    
    onMouseClick(myRef);
    // console.log(onMouseClick(myRef));
    useEffect(() => {
        if (noTick) {
            setTimeout(() => {
                setNoTick(false);
            }, 0);
        }
    }, [noTick])

    useEffect(() => {
        setTitle("Custom Page");
        setStyleName("layout design");
    }, []);
    const handleOnclick = (e) => {
        e.preventDefault();
        if (e) {
            console.log(getObj.x, getObj.y)
        }
    }
    // console.log(myRef.current)
    return (
        <MainCustomContainer
            maxWidth="xl"
            id="mainContainer"

        >
        
            <MainCustomGrid container spacing={1}>
                <Grid item xs={12} md={10}
                    onClick={(e) => handleOnclick(e)}
                    ref={myRef}
                >
                    <Box style={{ border: "1px solid blue", height: "20vh" }}>
                        <Typography component="h1" variant="h6">{getObj.x}</Typography>
                    </Box>
                    <Box style={{ border: "1px solid blue" }}>
                        <Typography component="h1" variant="h6">{getObj.y}</Typography>
                    </Box>
                </Grid>
                <Grid item sx={12} md={2}>

                </Grid>

            </MainCustomGrid>

        </MainCustomContainer>
    )

    function onMouseClick(myRef) {
        if (!noTick && myRef.current) {
            myRef.current.addEventListener('mouseover', (e) => {
                setGetObj({ x: e.screenX, y: e.screenY });
                setNoTick(true);
                removeEvents(myRef.current);

            });
        } else {



        }

    }
    function removeEvents(element) {
        if (element) {
            element.addEventListener("mouseout", (e) => {
                document.removeEventListener("mouseover", element, { passive: true });
                // document.removeEventListener("click", myRef.current, { passive: true });
                setNoTick(true)
            });
        }
    }
}



function getScroll() {
    document.addEventListener("scroll", (e) => {
        lastPosY = window.scrollY;
        lastPosX = window.scrollX;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (lastPosY > 0 && lastPosX) {
                    let obj = { "x": lastPosX, "y": lastPosY }
                    return obj

                }
                ticking = false;
            });

            ticking = true;
        }
    });

}
export default CustomPage