import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Stack, Typography, Container, Grid, Avatar, Divider } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import NavContainer from './NavContainer';
import CoverPage from './CoverPage';
import styled from 'styled-components';
import styles from './design11.module.css';
import SideBar from './SideBar';
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
animation:restoAppearIn 1.5s ease-in;
@keyframes restoAppearIn {
     from {opacity:0;}
     to {opacity:1;}
}
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
const CustChildGrid=styled(Grid)`
margin:0;
padding:0;
position:relative;
inset:0;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
background-image:url(${({bgimage})=>bgimage});
background-size:400% 100%;
animation : restoGrowIn 5s ease-in-out;
@keyframes restoGrowIn {
    from {background-size: 200% 200%;}
    to {background-size: 400% 100%;}
}
background-position: 35% 100%;
@media screen and (max-width:900px){
    background-size:100% 100%;
background-position: 50% 50%;
@keyframes restoGrowIn {
    from {background-size: 200% 200%;}
    to {background-size: 400% 100%;}
}
}
@media screen and (max-width:600px){
    background-size:100% 100%;
    background-position:50% 50%;
    @keyframes restoGrowIn {
        from {background-size: 200% 200%;}
        to {background-size: 100% 100%;}
    }
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
    const spoon=`${staticImage}/extra/spoon.png`;
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
    const logo2=`${staticImage}/images/Restaurant/logo.png`;
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
            <NavContainer menu={menu} logo={logo2}/>
            <Grid container spacing={{ xs: 0, md: 0 }}
                sx={{ overflow: "hidden", marginTop: { md: "-50px", xs: "-70px", sm: "-70px" },isolation:"isolate",margin:"0",padding:"0",background:"black",minHeight:{xs:"100vh"} }}
            >
                <CustChildGrid item xs={12} md={2} bgimage={dinning}
                    sx={{height:{md:"100vh",xs:"40vh"}}}
                >
                            <SideBar spoon={spoon}/>
                </CustChildGrid>
                <Grid item xs={12} md={10}
                    sx={{position:"relative",height:{md:"100vh",xs:"120vh",sm:"50vh"},padding:"0",margin:"auto",left:{md:"-15px",sm:"15px"},width:"100%",}}
                >
                <CoverPage arr={arr} />
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