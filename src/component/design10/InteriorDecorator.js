import React, { useState, useContext, useEffect, useMemo } from 'react';
import {useLocation} from 'react-router-dom';
import { Stack,Typography, Container } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {TokenAccessContext} from '../../context/TokenAccessProvider';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import CoverPage from './CoverPage';
import ProductServices from '../ProductServices';
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
    const location=useLocation();
    const pathname=location.pathname;
    const { setTitle, setStyleName,average,getProductDesigns,getPathLocation,pageRatings,staticImage
     } = useContext(GeneralContext);
    const {user_id,paid}=useContext(TokenAccessContext);
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
    const [pageRatingHelmet,setPageRatingHelmet]=useState([]);
    const [productServices,setProductServices]=useState([]);
    useMemo(()=>{
        let arr=[];
        if(getProductDesigns.loaded){
            let obj=getProductDesigns.data.filter(obj=>(obj.name==="Interior Designer"))[0];
            if(obj.services.length >0){
                arr=obj.services;
            }
            if(obj.postServices.length > 0) {
                arr=obj.services.concat(obj.postServices);
                setProductServices(arr);
            }
            if(obj.extraServices.length >0){
            arr=obj.services.concat(obj.postServices).concat(obj.extraServices);
            setProductServices(arr[0]);
            }else{setProductServices(arr)}
        }
    },[getProductDesigns.loaded,getProductDesigns.data]);

    useEffect(()=>{
        if(pageRatings.loaded && pageRatings.data){
            setPageRatingHelmet(pageRatings.data.filter(obj=>(obj.page===pathname)))
        }
    },[pathname,pageRatings]);

    useEffect(() => {
        const arr = [design1, design2, design3, design4, design5, design6, design7, design8, design9]
        let desc1=""
        let builtArr = [];
        let arr2=[];
        if (arr.length > 0) {
            arr.forEach((img, index) => {
                jsonArray.forEach((obj, index2) => {
                    if (index2 === index) {
                        builtArr.push({ ...obj, "image": img })
                        desc1 = desc1 + ",,, " + obj.desc.slice(0, 50)
                        arr2.push(obj.title)
                    }
                });

            });
            setLoadArr({ loaded: true, data: builtArr })
            setDesc(desc1)
            setKeyWords(arr2)
        }
    }, [setLoadArr,design1, design2, design3, design4, design5, design6, design7, design8, design9,setDesc,setKeyWords]);

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
             loadArr={loadArr.loaded ? loadArr.data : null}
             average={average !==0 ? average:"4"}
             getPathLocation={getPathLocation.loaded ? getPathLocation.data:""}
             pageRatings={pageRatingHelmet}
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
                 </Container>
                 <ProductServices productServices={productServices} staticImage={staticImage}/>
                 <Container maxWidth="md" sx={{ margin: "2rem auto", }} >   
                 <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Give your thought</Typography>
                    <hr />
                    <PageFeedback />
                    {!paid && <Stack direction="column" sx={{ margin: "1rem auto" }}>
                        {showPurchaseBtn ? <UserSignedInPurchaseBtn />
                            :
                            <ModalContainer />}
                    </Stack>}
                </Container>
                
            </BannerFeedBackStack>
            
        </MainContainerDv>

    )
}

export default InteriorDecorator