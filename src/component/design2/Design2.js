import React, { useContext, useEffect, useState, } from 'react';
import {useLocation} from 'react-router-dom';
import { Stack, Container, Grid, Typography, } from '@mui/material';
import ProductServices from '../ProductServices';

import { useTheme } from '@mui/material/styles';
import TitleArt from './TitleArt';
import WordArtLeft from './WordArtLeft';
import RightDesign from './RightDesign';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import { GeneralContext } from '../../context/GeneralContextProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import {TokenAccessContext} from '../../context/TokenAccessProvider';
import ModalContainer from '../utils/ModalContainer';
import PageFeedback from '../utils/PageFeedback';
import PageRating from '../utils/PageRating';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import RegisterPage from '../RegisterPage';
import styled from 'styled-components';
import styles from './design2.module.css'
import GetRegisterPages from '../utils/GetRegisterPages';
import Design2Helmet from "./Design2Helmet";
import Included from '../utils/Included';
import { useCallback } from 'react';


const GlobalColFlex = styled.div.attrs({className:"GlobalColFlex"})`
display:flex;
position:relative;
flex-direction:column;
justify-content:flex-start;
align-items:center;



`;

const ContainerFluid = styled.div`
margin-top:0.5rem;
width:100vw;
animation:arrear 1.5s ease-in-out;
@keyframes arrear {
    from { opacity:0;}
    to { opacity:1;}
}
@media screen and (max-width:900px){
    margin-top:-5px;
}
@media screen and (max-width:600px){
    margin-top:-55px;
}
`;
const Design2 = () => {
    const location=useLocation();
    const pathname=location.pathname;
    const { setTitle, setStyleName, workArr,setChangePage,staticImage,average,getProductDesigns,getPathLocation,pageRatings } = useContext(GeneralContext);
    // const {getProductList}=useContext(PriceContext);
    const {paid}=useContext(TokenAccessContext);
    const theme = useTheme();
    const [showPurchaseBtn,setShowPurchaseBtn]=useState(false);
    const [summary, setSummary] = useState(false);
    const [desc, setDesc] = useState(false);
    const [keywords, setKeywords] = useState(false);
    const [image, setimage] = useState(false);
    const [OBJ, setOBJ] = useState({});
    const [pageRatingHelmet,setPageRatingHelmet]=useState([]);
    const [productServices,setProductServices]=useState([]);
    
    useEffect(()=>{
        if(pageRatings.loaded && pageRatings.data){
            setPageRatingHelmet(pageRatings.data.filter(obj=>(obj.page===pathname)))
        }
    },[pathname,pageRatings]);

    useEffect(()=>{
        if(getProductDesigns.loaded){
        let obj=getProductDesigns.data.filter(obj=>(obj.name==="Retrospect"))[0]
        console.log(obj)
       setOBJ(obj)
        }
    },[getProductDesigns.data,getProductDesigns.loaded])

    useEffect(()=>{
        let arr=[];
        if(getProductDesigns.loaded){
            let obj=getProductDesigns.data.filter(obj=>(obj.name==="Retrospect"))[0]
            setSummary(obj.summary);
            setDesc(obj.desc);
            setKeywords("art-page,Art,Design,Web,Design,web-page,page product,purchase-a-site");
            setimage(`${staticImage}/${obj.imageName}`);
           
            // console.log(obj)
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
        if(window.scrollY){
            window.scroll(0,0);
            
        }
    },[getProductDesigns.loaded,getProductDesigns.data,setSummary,setKeywords,setimage,staticImage,setOBJ,OBJ,setProductServices]);

    useEffect(()=>{
        const getUser_id=localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")):null;
        if(getUser_id){
            setShowPurchaseBtn(true);
        }
    },[]);

    useEffect(() => {
        const title1 = workArr.filter(obj => (obj.id === 1))[0].title
        setTitle(title1);
        setStyleName("Style 2");
        setChangePage(false);
    }, [setTitle, setStyleName,setChangePage,workArr])
    return (
        <>
        <RegisterPage />
            <GetRegisterPages/>
            <PageRating/>
            <Design2Helmet 
            summary={summary}
             keywords={keywords}
             image={image}
             desc={desc}
             OBJ={OBJ}
             average={average !==0 ? average:"4"} 
            getPathLocation={getPathLocation.loaded ? getPathLocation.data:""}
            pageRatings={pageRatingHelmet}
            />
        <ContainerFluid >
            <Grid container spacing={0} sx={{borderBottom:"5px solid black",padding:"0px auto"}}>

                <Grid item xs={6} md={6} sx={{ backgroundColor: theme.palette.primary.lighter, height: "100vh", width: { xs: "100%", md: "30vw" }, position: "relative", border: "1px solid black" }}>

                    <TitleArt />
                    <WordArtLeft />


                    <Typography component="h1" variant="h5" sx={{ width: "100%", padding: "0.25rem 1rem", marginLeft: { xs: "1rem", lg: "14rem" }, marginTop: "0", color: theme.palette.common.dark, fontFamily: ` 'Edu TAS Beginner', cursive` }}>
                        “Creativity takes courage” <br /><span style={{ marginLeft: "3rem" }}> — Henri Matisse</span>
                    </Typography>

                    <Typography component="h1" variant="h6" sx={{ width: "100%", padding: "0.25rem 2rem", marginTop: { md: "0", xs: "12rem", sm: "1rem", lg: "4rem" }, color: theme.palette.common.dark, fontFamily: ` 'Edu TAS Beginner', cursive`, marginLeft: { xs: "1rem", lg: "14rem" } }}><FilterHdrIcon sx={{ fontSize: "40px", color: theme.palette.secondary.main }} /><br />
                        “If I could say it in words there would be no reason to paint.” <br /><span style={{ marginLeft: "3rem" }}> — Henri Matisse</span>
                    </Typography>

                    <Typography className={styles.ART} componenet="h1" variant="h2"
                        sx={{ fontSize: { xs: "180%", sm: "auto" }, top: { xs: "42%", lg: "56%",xl:"52%" } }}
                    >
                        ART
                    </Typography>
                    <Typography componenet="h1" variant="h1" className={styles.DESIGN}
                        sx={{ fontSize: { xs: "180%", sm: "290%" }, zIndex: "1000", top: { xs: "30%", sm: "29%", md: "auto" }, left: { sm: "75%", md: "80%", xs: "65%" } }}
                    >
                        DESIGN
                    </Typography>

                </Grid>
                <Grid item xs={6} md={6} sx={{ backgroundColor: theme.palette.common.light, height: "100vh", width: { xs: "50vw", md: "30vw" }, position: "relative" }}>
                    <Typography className={styles.DECO} componenet="h1" variant="h2"
                        sx={{ fontSize: { xs: "180%", sm: "auto" }, top: { xs: "42%", lg: "56%",xl:"52%" } }}

                    >
                        DECO
                    </Typography>
                    <GlobalColFlex style={{ height: "100%", width: "100%", color: "black" }}>
                        <img src="https://images.unsplash.com/photo-1655821189192-ee3bdde7ea2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" alt="www.master-connect.ca" style={{ width: "100%", height: "100%", margin: "auto" }} />
                    </GlobalColFlex>
                </Grid>
            </Grid>

            <GlobalColFlex sx={{ flex: "4", flexGrow: 1, height: "auto", backgroundColor: theme.palette.common.dark }}>
                <RightDesign />
            </GlobalColFlex>

           <Included product={OBJ ? OBJ:null} staticImage={staticImage}/>

        </ContainerFluid>
        <Container maxWidth="xs">
        {!paid && <Stack direction="column" sx={{ margin: "1rem auto" }}>
          {showPurchaseBtn  ? <UserSignedInPurchaseBtn /> :
          <ModalContainer />}
        </Stack>}
        <Typography component="h1" variant="h5" sx={{textAlign:"center",margin:"1rem auto"}}>Please comment on the design,below. We strive to improve.</Typography>
        <PageFeedback/>
      </Container>
      </>
    )
}

export default Design2