import React, { useEffect, useState, useContext, useCallback } from 'react';
import {useLocation} from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {TokenAccessContext} from '../../context/TokenAccessProvider';
import {PriceContext} from '../../context/PriceContextProvider';
import styled from 'styled-components';
import { Stack, Container, Typography, Grid, CardMedia, Fab,Switch } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import CoverPage from './CoverPage';
import Player from './Player';
import Store12Helmet from './Store12Helmet';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import PageRating from '../utils/PageRating';
import PageFeedback from '../utils/PageFeedback';
import ModalContainer from '../utils/ModalContainer';

const MainProductDiv = styled.div`
width:100vw;
margin-top:2px;
background:${({bg})=>bg};
color:${({bg})=>(bg ==="white"? "black":"white")};
@media screen and (max-width:900px){
margin-top:-0px;
}
@media screen and (max-width:800px){
margin-top:-0px;
}
@media screen and (max-width:600px){
margin-top:-5px;
}
@media screen and (max-width:400px){
margin-top:-55px;
}
`;
const StoreProduct = () => {
    const location=useLocation();
    const pathname=location.pathname;
    const theme = useTheme();
    const { setTitle, setStyleName, staticImage,getPathLocation,pageRatings,average } = useContext(GeneralContext);
    const {paid}=useContext(TokenAccessContext);
    const {getProductList}=useContext(PriceContext);
    const [showPurchaseBtn, setShowPurchaseBtn] = useState(false);
    const [getVidComps, setGetVidComps] = useState({});
    const [autoPlay, setAutoPlay] = useState(true);
    const [isBgChanged,setIsBgChanged]=useState(false);
    const [keyWords,setKeyWords]=useState([]);
    const [desc,setDesc]=useState("");
    const [helmetArr,setHelmetArr]=useState({loaded:false,data:[]});
    const [storeProd,setStoreProd]=useState({})

    const video = `${staticImage}/storePage/mangrave.mp4`;
    const mangrave1 = `${staticImage}/storePage/mangrave1.png`;
    const mangrave2 = `${staticImage}/storePage/mangrave2.png`;
    const mangrave3 = `${staticImage}/storePage/mangrave3.png`;
    const bgChanged= isBgChanged ? "white":"black";
    const bgOpposite= isBgChanged ? "black":"white";
    const [pageRatingHelmet,setPageRatingHelmet]=useState([]);

    useEffect(()=>{
        if(pageRatings.loaded && pageRatings.data){
            setPageRatingHelmet(pageRatings.data.filter(obj=>(obj.page===pathname)))
        }
    },[pathname,pageRatings]);

    useEffect(() => {
        let tempArr = [];
        const arr2 = [mangrave1, mangrave2, mangrave3];
        const storeProduct=(getProductList.loaded && getProductList.data) ? getProductList.data.filter(obj=>(obj.extra_kwargs===pathname))[0]:null;
            arr2.forEach((img,index)=>{
                tempArr.push({id:index,image:img,title:"Sample product"})
            });
            setHelmetArr({loaded:true,data:tempArr})
            setStoreProd(storeProduct)
            setDesc("a great page for a client who is selling a high quality product on the internet");
            setKeyWords("store page","man-cave","master-connect","Great Web designs!!","it's a must see!","great product"," Great Design");
        

    }, [mangrave1, mangrave2, mangrave3,pathname,getProductList]);

    useEffect(() => {
        setTitle("Product Page");
        setStyleName("product display");
        if(window.scrollY){
            window.scroll(0,0);
        }
    }, [setTitle, setStyleName]);

    const handleChecked = (e,checked) => {
        e.preventDefault();
        if(checked === false)return setIsBgChanged(false);
        if(checked === true)return setIsBgChanged(true);
        
    }
    return (
        <MainProductDiv
        bg={bgChanged}
        >
            <RegisterPage />
            <GetRegisterPages />
            <PageRating/>
            <Store12Helmet
             desc={desc} 
            keyWords={keyWords}
             helmetArr={helmetArr.loaded ? helmetArr.data:null}
             average={average !==0 ? average:"4"}
             getPathLocation={getPathLocation.loaded ? getPathLocation.data:""}
             pageRatings={pageRatingHelmet}
             storeProd={storeProd}
             video={video}
             />
            <Stack direction="column" spacing={1} 
            sx={{position:"absolute",top:{md:"5%",sm:"2%",xs:"1.4%"},right:{sm:"5%",xs:"2%"},zIndex:"1000",
            justifyContent:"center",alignItems:"center"
        }}
            >
                <Fab variant="extended" color="primary" size="small">
                    {isBgChanged ? "white" : "black"} <Switch color="warning" checked={isBgChanged} onChange={(e)=>handleChecked(e,e.target.checked)}/>
                </Fab>

            </Stack>
            <CoverPage />
            <Grid container spacing={{ xs: 0, sm: 1 }}>
                <Grid item xs={12} sm={12} md={6}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={6} sx={{padding:{sm:"0.75rem",xs:"0.5rem"},position:"relative"}}>
                            <Typography component="h1" variant="h3" sx={{margin:"0.5rem auto",textAlign:"center"}}>Weed Wacker</Typography>
                            <Typography component="h1" variant="body1" sx={{position:"relative"}}>
                            <CardMedia component="img" src={mangrave1} alt="www.master-connect.ca"
                                sx={{ borderRadius: "30%", width: "100%",height:"100%", textAlign: "left",boxShadow:"1px 1px 10px 4px rgba(0,0,0,.5)",margin:"1rem auto",background:bgOpposite }}
                            />
                                A premium 9,000 RPM motor powers a 360° rotary dual-blade system with SkinSafe™ Technology. Maneuver the hypoallergenic stainless steel cone tip with confidence against pulls, nicks or cuts;
                                Intelligent design features a 23° angle to match the contours of the nose & ear for precise hair trimming
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{padding:{sm:"0.75rem",xs:"0.5rem"},position:"relative"}}>
                        <Typography component="h1" variant="h3" sx={{margin:"0.5rem auto",textAlign:"center"}}>Weed Puller</Typography>
                            <Typography component="h1" variant="body1" sx={{position:"relative"}}>
                            <CardMedia component="img" src={mangrave2} alt="www.master-connect.ca"
                                sx={{ borderRadius: "30%", width: "100%",height:"100%",textAlign:"left",boxShadow:"1px 1px 10px 4px rgba(0,0,0,.5)",margin:"1rem auto",background:bgOpposite }}
                            />
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis consequuntur itaque quibusdam molestiae pariatur saepe cumque accusantium rerum recusandae et.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis consequuntur itaque quibusdam molestiae pariatur saepe cumque accusantium rerum recusandae et.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{padding:{sm:"0.75rem",xs:"0.5rem"},position:"relative"}}>
                        <Typography component="h1" variant="h3" sx={{margin:"0.5rem auto",textAlign:"center"}}>Skin Fertilizer</Typography>
                            <Typography component="h1" variant="body1" sx={{margin:"0.5rem auto",position:"relative"}}>
                            <CardMedia component="img" src={mangrave3} alt="www.master-connect.ca"
                                sx={{ borderRadius: "30%", width: "100%",height:"100%", textAlign: "left",boxShadow:"1px 1px 10px 4px rgba(0,0,0,.5)",margin:"1rem auto",background:bgOpposite }}
                            />
                            
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis consequuntur itaque quibusdam molestiae pariatur saepe cumque accusantium rerum recusandae et.
                                
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis consequuntur itaque quibusdam molestiae pariatur saepe cumque accusantium rerum recusandae et.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6} sx={{ position: "relative", cursor: "pointer", width: "100%", }}>
                    <Player src={video} bgChanged={bgChanged}/>
                </Grid>
            </Grid>
            
            <PageFeedback />
                {!paid && <Stack direction="column" sx={{ margin: "1rem auto" }}>
                    {showPurchaseBtn ? <UserSignedInPurchaseBtn />
                        :
                        <ModalContainer />}
                </Stack>}
        </MainProductDiv>

    )
}

export default StoreProduct