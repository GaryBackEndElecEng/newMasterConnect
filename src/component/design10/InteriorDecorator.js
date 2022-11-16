import React, { useState, useContext, useEffect, useRef } from 'react';
import { Stack, Box, Switch, Typography, Container } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import CoverPage from './CoverPage';
import styled from 'styled-components';
import styles from './design10.module.css'
import Design10Helmet from './Design10Helmet';
import jsonArray from './JsonArray.json';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import PageFeedback from '../utils/PageFeedback';
import { useTheme } from '@mui/material/styles';
import MidBanner from './MidBanner';

const MainContainerDv = styled.div`
width:100vw;
margin:auto;
min-height:100vh;
margin-top:0px;
position:relative;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
// overflow-x:hidden;
animation: fadeIn 1.5s ease-in-out;
@keyframes fadeIn {
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:900px){
    margin-top:0px;
}
@media screen and (max-width:600px){
    margin-top:-50px;
}
`;

const InteriorDecorator = () => {
    const {setTitle,setStyleName}=useContext(GeneralContext);
    const url = `https://new-master.s3.ca-central-1.amazonaws.com/interiorDesign`;
    const design1 = `${url}/interierDesign1.png`;
    const design2 = `${url}/interierDesign2.png`;
    const design3 = `${url}/interierDesign3.png`;
    const design4 = `${url}/interierDesign4.png`;
    const design5 = `${url}/interierDesign5.png`;
    const design6 = `${url}/interierDesign6.png`;
    const design7 = `${url}/interierDesign7.png`;
    const design8 = `${url}/interierDesign8.png`;
    const design9 = `${url}/interierDesign9.png`;
    const signature = `${url}/signature.png`;
    const arr = [design1, design2, design3, design4, design5, design6, design7, design8, design9]
    const MyRef = useRef();
    const theme = useTheme();
    const [opacity, setOpacity] = useState(1);
    const [getScroll, setGetScroll] = useState(0);
    const [loadArr, setLoadArr] = useState({ loaded: true, data: [] });

    useEffect(() => {
        let builtArr = []
        if (arr.length > 0) {
            arr.forEach((img, index) => {
                jsonArray.forEach((obj, index2) => {
                    if (index2 === index) {
                        builtArr.push({ ...obj, "image": img })
                    }
                });

            });
            setLoadArr({ loaded: true, data: builtArr })
        }
    }, [setLoadArr, arr]);
    useEffect(()=>{
        setTitle("Interior Design");
        setStyleName("Beautiful Design");
        if(window.scrollY){ 
            window.scroll(0,0);
        }
    },[]);
    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setOpacity(0);
                setGetScroll(window.scrollY)
            } else if (opacity === 0 && getScroll > window.scrollY) { setOpacity(1); }
        })
    }, { threshold: 1 })
    const handleMyRef = (e) => {
        let findScroll = window.scrollY
        if (e) {
            observer.observe(e);
        }
        if (opacity === 0 && findScroll < 1000) {
            setOpacity(1)
        }
    }
    useEffect(() => {
        // if(opacity===0){
        if (getScroll < 1500 && opacity === 0) {
            setOpacity(1);
        }else{setOpacity(0)}
        // }
    }, [opacity, getScroll, setOpacity]);

    return (
        <MainContainerDv
        >
            <RegisterPage />
            <GetRegisterPages />

            <Stack direction={{ md: "row", xs: "column" }}
                sx={{ marginTop: { md: "1rem", sm: "1rem", xs: "1rem" }, width: "100%", position: "fixed", top: "5%", left: "0%" }}
            >


                <CoverPage arr={arr} opacity={opacity} loadArr={loadArr} />


            </Stack>

            <Stack direction={{ xs: "column" }} sx={{ background: "white", width: "100%", minHeight: "30vh", marginTop: {md:"93vh",sm:"73vh",xs:"93vh"}, marginBottom: "1rem", zIndex: "100" }} ref={(e) => handleMyRef(e)}>
                <MidBanner arr={arr} signature={signature} loadArr={loadArr} />
                <Container maxWidth="md" sx={{ margin: "2rem auto", }} >

                    <PageFeedback />
                </Container>
            </Stack>
            <div style={{margin:"2rem auto"}} ref={(e) => handleMyRef(e)}></div>
        </MainContainerDv>

    )
}

export default InteriorDecorator