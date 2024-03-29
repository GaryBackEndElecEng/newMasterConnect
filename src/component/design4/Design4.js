import React, { useState, useContext, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { Stack, Grid, Container, Typography, } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
// import styles from './design3.module.css';
import ModalContainer from '../utils/ModalContainer';
import PageFeedback from '../utils/PageFeedback';
import PageRating from '../utils/PageRating';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import Titlebar from './Titlebar'
import RegisterPage from '../RegisterPage';
import Statement from './Statement';
import ImageDisplay from './ImageDisplay';
import GetRegisterPages from '../utils/GetRegisterPages';
import Design3Helmet from './Design3Helmet';
import ProductServices from '../ProductServices';
import Included from '../utils/Included';

const BoxAutomate = styled.h4.attrs({className:"BoxAutomate"})`

display:${({display})=>display};
background:${({bg})=>bg};
position:absolute;
font-family:Roboto;
animation:showPara 1.5s ease-in;
transition:width 1.5s ease-in;
left:10%;
padding:1rem;
width:80%;
top:50%;
border-radius:25%;
box-shadow: 1px 2px 13px 5px white;
@keyframes showPara {
    from {
        opacity:0;
        transform:scale(0);
    }
    to {
        opacity:1;
        transform:scale(1);
    }
}

@media screen and (max-width:1200px){
    top:45%;
    left:40%;
}
@media screen and (max-width:860px){
    top:30%;
    left:8%;
    padding:1rem;
    
}
@media screen and (max-width:600px){
    top:10%;
    left:5%;
    font-size:18px;
}

@media screen and (max-width:550px){
    top:24%;
    left:8%;
    font-size:18px;
}

media screen and (max-width:400px){
    top:10%;
    left:5%;
    font-size:18px;
}




`;


const MoonWalk = styled.div`
display:flex;
flex-direction:column;
position:relative;
justify-content:center;
align-items:center;
padding:1rem;
border-radius:50%;
background-image:url(${({bg})=>bg});
background-size:100% 100%;
height:50vw;
width:50vw;
margin:auto;
display:${({display})=>display};
alt:www.master-connect.ca;

animation:moonMove 3s ease-in;

@keyframes moonMove {
    from {
        opacity:0;
        transform:scale(0.5) translateX(-300%);
        height:0px;
    }
    to {
        opacity:1;
        transform:scale(1) translateX(0%);
        height:50vw;

    }
}
@media screen and (max-width:1000px){
    flex-direction:column;
    justify-content:flex-end;
    padding:0.5rem;
    height:350px;
    width:350px;
    position:absolute;
    left:57%;
    top:-360px;
    

    @keyframes moonMove {
        from {
            opacity:0;
            transform:scale(0.5) translate(-980px,-500px);
        }
        to {
            opacity:1;
            transform:scale(1) translate(0px,0px);
    
        }
    }
}
@media screen and (max-width:560px){
    flex-direction:column;
    justify-content:flex-end;
    padding:0.5rem;
    height:250px;
    width:250px;
    position:absolute;
    left:55%;
    top:-250px;

    @keyframes moonMove {
        from {
            opacity:0;
            transform:scale(0.5) translate(-600px,-700px);
        }
        to {
            opacity:1;
            transform:scale(1) translate(0%,0%);
    
        }
    }
}



@media screen and (max-width:500px){
    flex-direction:column;
    justify-content:flex-end;
    padding:0.5rem;
    height:200px;
    width:200px;
    position:absolute;
    left:50%;
    top:-250px;

    @keyframes moonMove {
        from {
            opacity:0;
            transform:scale(0.5) translate(-400px,-800px);
        }
        to {
            opacity:1;
            transform:scale(1) translate(0%,0%);
    
        }
    }
}
`;


const ContainerFluidBgImage = styled.div`
margin:0px;
margin-top:5px;
width:100%;
min-height:120vh;
background-image:url(${({ bgImage }) => bgImage});
background-size:100% 100%;

@media screen and (max-width:900px){
    min-height:450px;
    margin-top:-5px;

}
@media screen and (max-width:800px){
    min-height:550px;
    margin-top:-5px;
}
@media screen and (max-width:660px){
    min-height:850px;
    margin-top:-55px;
}

`;
const CustomDesign3=styled.div`
margin:0;
animation: clearIn 2s ease-in-out;
@keyframes clearIn {
  from {opacity:0;}
  to {opacity:1;}
}
@media screen and (max-width:900px){
margin-top:-2px;
}
@media screen and (max-width:600px){
  margin-top:-54px;

}
`;


const Design4 = () => {
    const location=useLocation();
    const pathname=location.pathname
    // const {getProductList}=useContext(PriceContext);
    const { setTitle, setStyleName,staticImage, workArr,setChangePage,average,getPathLocation,pageRatings,getProductDesigns } = useContext(GeneralContext);
    // const {paid}=useContext(TokenAccessContext);
    const [showPara, setShowPara] = useState('none'); 
    const [showPurcahseBtn,setShowPurchaseBtn]=useState(false);
    const [startStatement,setStartStatement]=useState(false);
    const [startMoon,setStartMoon]=useState(false);
    const [startBoxAnimation,setStartBoxAnimation]=useState(false);
    const earthPic = `${staticImage}/earth.png`;
    const imgMoon= `${staticImage}/moon.png`
    const [summary, setSummary] = useState(false);
    const [desc, setDesc] = useState(false);
    const [keywords, setKeywords] = useState(false);
    const [image, setimage] = useState(false);
    const [OBJ, setOBJ] = useState({});
    const theme = useTheme();
    const [pageRatingHelmet,setPageRatingHelmet]=useState([]);
    const [productServices,setProductServices]=useState([]);
    
    useEffect(()=>{
        if(pageRatings.loaded && pageRatings.data){
            setPageRatingHelmet(pageRatings.data.filter(obj=>(obj.page===pathname)))
        }
    },[pathname,pageRatings]);

    useEffect(()=>{
        let arr=[];
        if(getProductDesigns.loaded){
            let obj=getProductDesigns.data.filter(obj=>(obj.name==="SpaceFrontier"))[0]
            setSummary(obj.summary);
            setDesc(obj.desc);
            setKeywords("Moon-struck,Web,Design,web-page,page product,purchase-a-site");
            setimage(`${staticImage}/${obj.imageName}`);
            setOBJ(obj);
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
    },[getProductDesigns.loaded,getProductDesigns.data,staticImage,setOBJ,OBJ,setProductServices]);

    useEffect(() => {
        const title1 = workArr.filter(obj => (obj.id === 3))[0].title
        setTitle(title1);
        setStyleName("Style 4");
        setChangePage(false);
        setTimeout(() => {
            setShowPara("block");
        }, 3400)
    }, [setTitle, setStyleName,setChangePage,workArr]);

    
    useEffect(()=>{
        const getUser_id=localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")):null;
        if(getUser_id){
            setShowPurchaseBtn(true);
        }
        setTimeout(()=>{
            setStartStatement(true);
        },1000);
        setTimeout(()=>{
            if(startStatement){
                setStartMoon(true);
            }
        },4000);
        setTimeout(()=>{
            if(startMoon){
                setStartBoxAnimation(true);
            }
        },4000)
    },[startStatement,startMoon]);
    

    return (
        <CustomDesign3>
        <GetRegisterPages/>
                <RegisterPage />
                <PageRating/>
                <Design3Helmet 
                summary={summary} 
                desc={desc}
                 image={image}
                 keywords={keywords}
                 OBJ={OBJ}
                 average={average !==0 ? average:"4"}
                 getPathLocation={getPathLocation.loaded ? getPathLocation.data:""}
                 pageRatings={pageRatingHelmet}
                 />
            <ContainerFluidBgImage bgImage={earthPic} >
                
                <Stack direction="column" sx={{ marginTop: "0px", width: "100%",marginBottom:"1rem" }}>
                    <Titlebar />
                </Stack>
                <Grid
               
                    sx={{
                        color: theme.palette.secondary.main,
                        width: { md: "100%", xs: "auto" }, display: "flex",
                        flexDirection: { md: "row", xs: "column" }, justifyContent: { md: "space-between", xs: "flex-start" },
                        alignItems: "center", margin: "auto",
                    }}
                    
                >
                    <Grid item xs={12} md={6}
                        sx={{
                            margin: { md: "auto", xs: "0 auto" },
                             width: "100%",
                            alignSelf: "flex-start", 
                            justifySelf: "flex-start",
                            position:"relative",
                        }}
                    >
                       {startStatement && <Statement/>}
                    </Grid>
                    <Grid item xs={12} md={6}
                        sx={{
                            color: theme.palette.secondary.main,
                            width: "100%",
                            height:"100%",
                            margin: "auto",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            position: "relative",
                        }}
                    >
                       {startMoon && <MoonWalk
                            bg={imgMoon}
                           
                        >
                            
                           {startBoxAnimation && <BoxAutomate 
                            display={showPara} 
                            bg={theme.palette.common.fadeCharcoal}
                            
                            >
                                “The universe is a pretty big place. If it’s just us, seems like an awful waste of space.”- Jody Foster
                            </BoxAutomate>}
                        </MoonWalk>}
                    </Grid>

                </Grid>
                
            </ContainerFluidBgImage>
            <ImageDisplay/>
            <Stack direction="column" sx={{justifyContent:"center",alignItems:"center"}}>
                <Typography component={"h1"} variant="h4" sx={{color:"black"}}>
                Please provide Us with feedback to help us improve - Much Appreciated
                </Typography>
            </Stack>
            <PageFeedback/>
            
        </CustomDesign3>

    )
}

export default Design4