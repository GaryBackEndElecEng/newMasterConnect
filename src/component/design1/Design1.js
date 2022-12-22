import React, { useContext, useEffect, useState,useMemo } from 'react';
import {useLocation} from 'react-router-dom';
import { Box, Container, Stack, Grid, Typography,Switch} from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider.js';
// import { PriceContext } from '../../context/PriceContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { useTheme } from '@mui/material/styles';
import CardSample from './CardSample';
import CardSample2 from './CardSample2';
import MyWork from './MyWork';
import GridLayer from './GridLayer';
import ModalContainer from '../utils/ModalContainer';
import RegisterPage from '../RegisterPage';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import styled from 'styled-components';
import GetRegisterPages from '../utils/GetRegisterPages';
import PageRating from '../utils/PageRating';
import PageFeedback from '../utils/PageFeedback';
import Design1Helmet from './Design1Helmet';
import CustomDetails from './CustomDetails';
import arrayLodges from './imageArr';
import arrayLodgesFR from './imageArrayFr';
import array from './ratingArray.json';
import arrayFr from './ratingArrayFr.json';
import ProductServices from '../ProductServices';
import Included from '../utils/Included';



const CustBoxPageCover = styled(Box)`
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
width:100vw;
margin-top:-15px;
position:relative;
background-image:url(${({ bg }) => bg});
background-size: 100% 100%;
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
const CustomDesign1=styled.div`
margin: 1rem auto;
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


// loadGoogleFont("Playfair + Display");
const Design1 = () => {
  
  const theme = useTheme();
  const location=useLocation();
    const pathname=location.pathname
  const fade2 = 0.8
  const { setTitle, setStyleName, workArr,setChangePage,staticImage,average,getPathLocation,pageRatings,getProductDesigns } = useContext(GeneralContext);
  
  const {paid}=useContext(TokenAccessContext);
  const [showPurchaseBtn, setShowPurchaseBtn] = useState(false);
  const image1 = "https://master-connect.s3.ca-central-1.amazonaws.com/static/pics/shortTermRental2.png";

  const [summary, setSummary] = useState(false);
    const [desc, setDesc] = useState(false);
    const [keywords, setKeywords] = useState(false);
    const [image, setimage] = useState(false);
    const [OBJ, setOBJ] = useState(false);
    const [productServices,setProductServices]=useState([]);
    const [lang, setLang] = useState(false);
    const [langArr, setLangArr] = useState([]);
    const [langPlaceArr, setLangPlaceArr] = useState([]);
    const [pageRatingHelmet,setPageRatingHelmet]=useState([]);

    

    useEffect(()=>{
      if(pageRatings.loaded && pageRatings.data){
          setPageRatingHelmet(pageRatings.data.filter(obj=>(obj.page===pathname)))
      }
  },[pathname,pageRatings]);

    useMemo(()=>{
      let arr=[],arr2=[];
        if(getProductDesigns.loaded){
            let obj=getProductDesigns.data.filter(obj=>(obj.name==="HomeStyle"))[0]
            setSummary(obj.summary);
            setDesc(obj.desc);
            setKeywords("Flower-store,Web,Design,web-page,page product,purchase-a-site");
            setimage(`${staticImage}/${obj.imageName}`);
            setOBJ(obj)
            arr=obj.services
            // console.log(obj.services)
            if(obj.postServices.length > 0){
            arr=obj.services.concat(obj.postServices);
            // console.log(arr)
            }
            if(obj.extraServices.length >0){
            arr=obj.services.concat(obj.postServices).concat(obj.extraServices);
            // console.log(obj.extraServices)
            }
            
            // arr.arr.concat(obj.extraServices);
            setProductServices(arr)
        }
        if(window.scrollY){
          window.scroll(0,0);
      }
    },[getProductDesigns.loaded,getProductDesigns.data,staticImage]);

    useEffect(()=>{
      if(lang===true){
        setLangArr(arrayFr)
        setLangPlaceArr(arrayLodgesFR)
      }
      if(lang===false){
        setLangArr(array)
        setLangPlaceArr(arrayLodges)
      }
    },[lang]);
 

  useEffect(() => {
    const title1 = workArr.filter(obj => (obj.id === 0))[0].title
    setTitle(title1)
    setStyleName("Style 1");
    setChangePage(false);
  }, [setTitle, setStyleName,setChangePage,workArr]);

  useEffect(() => {
    const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null;
    if (getUser_id) {
      setShowPurchaseBtn(true);
    }
  }, []);

  return (
    <CustomDesign1>

      <RegisterPage />
      <GetRegisterPages/>
      <PageRating/>
      <Design1Helmet
       summary={summary}
       desc={desc}
       image={image}
       keywords={keywords}
       OBJ={OBJ}
      average={average} 
      getPathLocation={getPathLocation.loaded ? getPathLocation.data:""}
      pageRatings={pageRatingHelmet}
      />
      <CustBoxPageCover bg={image1} sx={{ position: "relative" }}>
        
          <Grid container spacing={0}
            sx={{
              height: { lg: "80vh", md: "50vh", sm: "30vh",xs:"30vh" },
              
              justifyContent: "center",
              alignItems: "flex-start",
              overflowY: "scroll",
              padding: { xs: "5px", sm: "1rem" },
              marginTop: "0px", marginBottom: "2rem"
            }}
          >
            <Stack direction="row"
             sx={{justifyContent:"flex-start",alignItems:"center",width:{md:"25%",sm:"30%",xs:"80%",lg:"10%"},
            position:"absolute",top:{sm:"1%",md:"5%",xs:"100%"},right:{sm:"35%",xs:"15%",lg:"45%"},background:theme.palette.common.orangeFade2,paddingLeft:"0.25rem"
            }}
             spacing={2}
            >
              <Typography component="h1" variant="h5" sx={{paddingLeft:"0.5rem"}}>{lang ? "to english":"a francais"}</Typography>
              <Switch checked={lang} onChange={(e)=>setLang(e.target.checked)} sx={{ml:1}}/>
            </Stack>
            {

                langArr.map((obj) => (
                <Grid item xs={12} sm={6} md={4} lg={6} key={obj.id}
                  sx={{ display: "flex", flexDirection: "column", alignItems: "center",margin:{sm:"1rem auto",md:"auto"}  }}
                >
                  <CardSample2 fade={fade2} rating={obj.rating} name={obj.name} comment={obj.comment}  />
                </Grid>
              ))
            }</Grid>

          
            <Container maxWidth={"xl"}
            sx={{background:theme.palette.fade,color:"white",position:"relative",minHeight:{xs:"20vh",lg:"18vh"},}}
            >
              <CustomDetails lang={lang} />
            </Container>
         
        

      </CustBoxPageCover>
      <Container maxWidth={"xl"}
        sx={{
          
          marginTop: "1rem", marginBottom: "1rem",

        }}
      >
        <Grid container spacing={0} sx={{ justifyContent: "center", alignItems: "flex-start",width:"100%",marginTop:{xs:"2rem",sm:"auto"} }}>
          {langPlaceArr.map((obj,index) => (
            <Grid item xs={12} sm={6} md={4} key={`${obj.id}-${index}`}
              sx={{ margin: { xs: "0.5rem auto", sm: "2rem auto" }, width: "100%", }}
            >
              <CardSample fade={1} comment={obj.comment} title={obj.title} image={obj.image} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container maxWidth={"xl"}>
        <GridLayer />
      </Container>
      <MyWork lang={lang}/>
      <Included product={OBJ} staticImage={staticImage}/>


      <Container maxWidth={"md"}>
        {!paid && <Stack direction={"column"} sx={{ margin: "1rem auto" }}>
          {showPurchaseBtn ? <UserSignedInPurchaseBtn />
            :
            <ModalContainer />}
        </Stack>}
        <Typography component="h1" variant="h5" sx={{textAlign:"center",margin:"1rem auto"}}>{lang ? "Veuillez commenter la conception ci-dessous. Nous nous efforçons de nous améliorer.":"Please comment on the design,below. We strive to improve."}</Typography>
        <PageFeedback/>
      </Container>
    </CustomDesign1>


  )
}

export default Design1