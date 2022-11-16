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
    margin-top:-0px;
}
@media screen and (max-width:600px){
    margin-top:0px;
}
`;
const BannerFeedBackStack=styled(Stack)`
width:100%;
justify-content:center;
align-items:center;
min-height:30vh;
margin-top:93vh;
@media screen and (max-width:900px){
    margin-top:94vh;
}
@media screen and (max-width:800px){
margin-top:93vh;
}
@media screen and (max-width:600px){
margin-top:93vh;
}
@media screen and (max-width:500px){
margin-top:100vh;
}
`;
const CoverPageStack=styled(Stack)`
top:6%;
@media screen and (max-width:900px){
top:4%;
}
@media screen and (max-width:800px){
top:4.5%;
}
@media screen and (max-width:500px){
top:4.5%;
}
@media screen and (max-width:400px){
top:5.5%;
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
    const z_index= opacity===0 ? "-1111":"1";
    let ticking=false;
    let lastPos=0;

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

    const doFunc=(scrollCount)=>{
        if(scrollCount<1400){
            setGetScroll(scrollCount)
            setOpacity(1)
        // console.log(scrollCount)
        }else(setOpacity(0))
    }
    
    const getScroll1 = ()=>{
        document.addEventListener("scroll",(e)=>{
            lastPos = window.scrollY;
            if(!ticking){
                window.requestAnimationFrame(()=>{
                    if(lastPos > 0){
                        doFunc(lastPos);
                    
                    }
                    ticking=false;
                });
                // setOpacity(0);
                ticking=true;
            }
        });
        
        
    }
    getScroll1();


    

    return (
        <MainContainerDv
        >
            <RegisterPage />
            <GetRegisterPages />

            <CoverPageStack direction={{ md: "row", xs: "column" }}
                sx={{ marginTop: { md: "1rem", sm: "1rem", xs: "1rem" }, width: "100%", position: "fixed", left: "0%",zIndex:z_index,

            }}
            >


                <CoverPage arr={arr} opacity={opacity} loadArr={loadArr} />


            </CoverPageStack>

            <BannerFeedBackStack spacing={{xs:0,md:1}} direction={{ xs: "column" }} sx={{ background: "white", marginBottom: "1rem", zIndex: "100" }} >
                <MidBanner arr={arr} signature={signature} loadArr={loadArr} />
                <Container maxWidth="md" sx={{ margin: "2rem auto", }} >

                    <PageFeedback />
                </Container>
            </BannerFeedBackStack>
        </MainContainerDv>

    )
}

export default InteriorDecorator