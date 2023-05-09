import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Stack, Typography, Container, Grid, Button, Divider } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import CoverPage from './CoverPage';
import styled from 'styled-components';
import styles from './design11.module.css'
import Design11Helmet from './Design11Helmet';
import jsonArray from './JsonArray.json';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import PageRating from '../utils/PageRating';
import PageFeedback from '../utils/PageFeedback';
import { useTheme } from '@mui/material/styles';
// import MidBanner from './MidBanner';
// import BannerGetQuote from './BannerGetQuote';
import ModalContainer from '../utils/ModalContainer';
import StarIcon from '@mui/icons-material/Star';
import ItemList from './ItemList';
// import ProductServices from '../ProductServices';
import Included from '../utils/Included';

const MainRestaurant = styled.div`
width:100vw;
// margin:auto;
margin-top:0px;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
position:relative;
@media screen and (max-width:900px){
    margin-top:-25px;
}
@media screen and (max-width:800px){
    margin-top:-25px;
}
@media screen and (max-width:600px){
    margin-top:-60px;
}
@media screen and (max-width:500px){
    margin-top:-80px;
    
}

`;

const Restaurant = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const theme = useTheme();
    const { setTitle, setStyleName, average, productDesigns, getPathLocation, pageRatings,staticImage } = useContext(GeneralContext);
    const [showPurchaseBtn, setShowPurchaseBtn] = useState(false);
    const [keyWords, setKeyWords] = useState([]);
    const [desc, setDesc] = useState("");
    const url = `https://new-master.s3.ca-central-1.amazonaws.com/static/images/Restaurant`;
    const dinning = `${url}/dinning.png`;
    const menu = `${url}/menu.png`;
    const design1 = `${url}/rest1.png`;
    const design2 = `${url}/rest2.png`;
    const design3 = `${url}/rest3.png`;
    const design4 = `${url}/rest4.png`;
    const design5 = `${url}/rest5.png`;
    const design6 = `${url}/rest6.png`;
    const design7 = `${url}/rest7.png`;
    const design8 = `${url}/rest8.png`;
    const design9 = `${url}/rest9.png`;
    const design10 = `${url}/rest10.png`;
    const arr = [design1, design2, design3, design4, design5, design6]
    const [restArr, setRestArr] = useState({ loaded: false, data: [] });
    const logo = "https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png";
    const [pageRatingHelmet, setPageRatingHelmet] = useState([]);
    const [productServices, setProductServices] = useState([]);
    const arrStar=[1,2,3,4,5];
    

    useEffect(() => {
        if (pageRatings.loaded && pageRatings.data) {
            setPageRatingHelmet(pageRatings.data.filter(obj => (obj.page === pathname)))
        }
    }, [pathname, pageRatings]);

    useEffect(() => {
        let tempArr = [];
        const arr2 = [design1, design2, design3, design4, design5, design6, design7, design8, design9, design10];
        let arr = [];
        let tempDesc = "";

        jsonArray.forEach((obj, index) => {
            tempArr.push({ ...obj, "image": arr2[index] });
            tempDesc = tempDesc + ",,," + obj.desc.slice(0, 30);
            arr.push(obj.title)

        });
        setRestArr({ loaded: true, data: tempArr });
        setDesc(tempDesc);
        setKeyWords(arr);


    }, [design1, design2, design3, design4, design5, design6, design7, design8, design9, design10]);

   


    useEffect(() => {
        setTitle("Restaurant");
        setStyleName(" Great for a restaurant owner");
        if (window.scrollY) {
            window.scroll(0, 0);
        }
        const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null;
        if (getUser_id) {
            setShowPurchaseBtn(true);
        }
    }, [setTitle, setStyleName]);



    return (
        <MainRestaurant
        className={styles.mainRestaurant}
        >
            <RegisterPage />
            <GetRegisterPages />
            <PageRating />
            <Design11Helmet
                desc={desc}
                keyWords={keyWords}
                loadArr={restArr.loaded ? restArr.data : null}
                average={average !== 0 ? average : "4"}
                getPathLocation={getPathLocation.loaded ? getPathLocation.data : ""}
                pageRatings={pageRatingHelmet}
            />
            <Container maxWidth="xl" sx={{ margin: "2rem auto", backgroundImage: { xs: `url(${menu})`, md: "none" }, backgroundSize: "100% 100%", marginBottom: { md: "4rem", xs: "0px" } }}>
                <Divider sx={{ marginBottom: "1rem", color: { xs: "white", md: "black" }, border: { md: `2px solid black`, xs: "2px solid white" } }} />
                <Grid container spacing={{ xs: 1, sm: 2 }}
                >
                    <Grid item xs={12} sm={8}>
                        <Stack direction="row" spacing={1} sx={{ flex: "6", color: { xs: "white", md: "black" } }}>
                            <Button sx={{ color: { xs: "white", md: "black" } }}> Menu</Button>
                            <Button sx={{ color: { xs: "white", md: "black" } }}> Register</Button>
                            <Button sx={{ color: { xs: "white", md: "black" } }}> Extras</Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Stack direction="row" spacing={1} sx={{ flex: "6" }}>
                            <Button sx={{ color: { xs: "white", md: "black" } }}> log-in</Button>
                        </Stack>
                    </Grid>
                </Grid>
                <Divider sx={{ marginBottom: "2rem", color: { xs: "white", md: "black" }, border: { md: `2px solid black`, xs: "2px solid white" } }} />
            </Container>
            <Grid container spacing={{ xs: 0, md: 0 }}
                sx={{ overflow: "hidden", marginTop: { md: "-50px", xs: "0px", sm: "0px" }, margin: "1rem auto", }}
            >
                <Grid item xs={12} md={2} sx={{ padding: "1rem", backgroundImage: `url(${dinning})`, backgroundSize: { xs: "100% 100%", md: "400% 100%" },backgroundPosition:"35% 100%" }} >
                    <Grid container spacing={0} sx={{ color: "white",background:"rgba(255,255,255,0.2)" }} >
                        <Grid item xs={12}  >
                            <Typography component="h1" variant="h1" sx={{ fontFamily: "great vibes" }}>La Cuisine</Typography>
                            <Stack direction="row">
                                {arrStar.map(obj=>(<StarIcon key={obj} sx={{ ml: 1, color: theme.palette.common.darkBlue, fontSize: "26px" }} />))}
                            </Stack>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography component="h1" variant="h4" sx={{ marginLeft: "10px", margin: "1rem auto" }}>Fine Cuisine</Typography>
                            <Typography component="h1" variant="h6" sx={{ marginLeft: "10px" }}>123 my address,</Typography>
                            <Typography component="h1" variant="h6" sx={{ marginLeft: "10px" }}>city, Country</Typography>


                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12} md={10}

                >
                    <Container maxWidth="xl" sx={{ overflow: "hidden", marginTop: { md: "-50px", xs: "60px", sm: "0px" }, maxHeight: "100vh", position: "relative", margin: "2rem auto" }}>
                        <CoverPage arr={arr} />
                    </Container>
                </Grid>
            </Grid>
            <Typography component="h1" variant="h3">Top Menu</Typography>
            <hr style={{ borderBottom: "2px solid red" }} />
            <ItemList resArr={restArr} title={"Title"} />
            
            <Container maxWidth="lg" sx={{ margin: "1rem auto" }}>
                <Typography component="h1" variant="h4" sx={{ textAlign: "center", margin: "1rem auto" }}>Please comment - we aim to improve</Typography>
                <PageFeedback />
                
            </Container>


        </MainRestaurant>
    )
}

export default Restaurant