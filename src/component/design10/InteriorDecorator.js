import React, { useState, useContext, useEffect, useRef } from 'react';
import { Stack,Typography, Container } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {TokenAccessContext} from '../../context/TokenAccessProvider';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import CoverPage from './CoverPage';
import styled from 'styled-components';
import Design10Helmet from './Design10Helmet';
import jsonArray from './JsonArray.json';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import PageRating from '../utils/PageRating';
import PageFeedback from '../utils/PageFeedback';
import { useTheme } from '@mui/material/styles';
import MidBanner from './MidBanner';
import BannerGetQuote from './BannerGetQuote';
import ModalContainer from '../utils/ModalContainer';

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
const BannerFeedBackStack = styled(Stack)`
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
const CoverPageStack = styled(Stack)`
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
    const { setTitle, setStyleName,average,conical,getPathLocation
     } = useContext(GeneralContext);
    const {user_id}=useContext(TokenAccessContext);
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
    const contact = `${url}/contact.png`;
    const arr = [design1, design2, design3, design4, design5, design6, design7, design8, design9]
    const [opacity, setOpacity] = useState(1);
    const [getScroll, setGetScroll] = useState(0);
    const [loadArr, setLoadArr] = useState({ loaded: true, data: [] });
    const [keyWords, setKeyWords] = useState([]);
    const [desc, setDesc] = useState("");
    const [showPurchaseBtn, setShowPurchaseBtn] = useState(false);
    const z_index = opacity === 0 ? "-1111" : "1";
    let ticking = false;
    let lastPos = 0;

    useEffect(() => {
        const arr = [design1, design2, design3, design4, design5, design6, design7, design8, design9]
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
    }, [setLoadArr,design1, design2, design3, design4, design5, design6, design7, design8, design9]);
    useEffect(() => {
        setTitle("Interior Design");
        setStyleName("Beautiful Design");
        if (window.scrollY) {
            window.scroll(0, 0);
        }
        const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null;
        if (getUser_id) {
          setShowPurchaseBtn(true);
        }
    }, [user_id,setTitle,setStyleName]);

    useEffect(() => {
        let arr = []
        let desc1 = ""
        if (loadArr.loaded) {
            loadArr.data.forEach((obj, index) => {
                arr.push(obj.title)
                desc1 = desc1 + ",,, " + obj.desc.slice(0, 50)
            });
            setKeyWords(arr)
            setDesc(desc1)
        }
    }, [loadArr, setKeyWords]);

    const doFunc = (scrollCount) => {
        if (scrollCount < 1400) {
            setGetScroll(scrollCount)
            setOpacity(1)
            // console.log(scrollCount)
        } else (setOpacity(0))
    }

    const getScroll1 = () => {
        document.addEventListener("scroll", (e) => {
            lastPos = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (lastPos > 0) {
                        doFunc(lastPos);

                    }
                    ticking = false;
                });
                // setOpacity(0);
                ticking = true;
            }
        });


    }
    getScroll1();




    return (
        <MainContainerDv
        >
            <Design10Helmet 
            desc={desc}
             keyWords={keyWords}
             loadArr={loadArr}
             average={average}
             conical={conical.loaded ? conical.data:""}
             getPathLocation={getPathLocation.loaded ? getPathLocation.data:""}
             />
            <RegisterPage />
            <GetRegisterPages />
            <PageRating/>

            <CoverPageStack direction={{ md: "row", xs: "column" }}
                sx={{
                    marginTop: { md: "1rem", sm: "1rem", xs: "1rem" }, width: "100%", position: "fixed", left: "0%", zIndex: z_index,

                }}
            >


                <CoverPage arr={arr} opacity={opacity} loadArr={loadArr} />


            </CoverPageStack>

            <BannerFeedBackStack spacing={{ xs: 0, md: 1 }} direction={{ xs: "column" }} sx={{ background: "white", marginBottom: "1rem", zIndex: "100" }} >
                <MidBanner arr={arr} signature={contact} loadArr={loadArr} />
                <Container maxWidth="md" sx={{ margin: "2rem auto", }} >
                    <BannerGetQuote contact={contact} />
                    <Typography component="h1" variant="h3" sx={{ textAlign: "center" }}>Feedback</Typography>
                    <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Give your thought</Typography>
                    <hr />
                    <PageFeedback />
                    <Stack direction="column" sx={{ margin: "1rem auto" }}>
                        {showPurchaseBtn ? <UserSignedInPurchaseBtn />
                            :
                            <ModalContainer />}
                    </Stack>
                </Container>
            </BannerFeedBackStack>
        </MainContainerDv>

    )
}

export default InteriorDecorator