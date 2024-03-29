import React, { useEffect, useContext, useState } from 'react';
import {useLocation} from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import ImagesContainer from './ImagesContainer';
import { GeneralContext } from '../../context/GeneralContextProvider.js';
import { PriceContext } from '../../context/PriceContextProvider.js';
// import { TokenAccessContext } from '../../context/TokenAccessProvider.js';
// import { useTheme } from '@mui/material/styles';
import ModalContainer from '../utils/ModalContainer';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import RegisterPage from '../RegisterPage';
import PageFeedback from '../utils/PageFeedback';
import GetRegisterPages from '../utils/GetRegisterPages';
import Design3Helmet from './Design3Helmet';
import ProductServices from '../ProductServices';
import Included from '../utils/Included';


const Page1 = () => {
  const location=useLocation();
  const pathname=location.pathname;
  const { setTitle, setStyleName,workArr ,setChangePage,average,staticImage,getPathLocation,pageRatings,getProductDesigns} = useContext(GeneralContext);
  const {getProductList}=useContext(PriceContext);
  
  const [showPurchaseBtn,setShowPurchaseBtn]=useState(false);
  const [summary, setSummary] = useState(false);
    const [desc, setDesc] = useState(false);
    const [keywords, setKeywords] = useState(false);
    const [image, setimage] = useState(false);
    const [OBJ, setOBJ] = useState(false);
    const [pageRatingHelmet,setPageRatingHelmet]=useState([]);
    const [productServices,setProductServices]=useState([]);
    
    useEffect(()=>{
        if(pageRatings.loaded && pageRatings.data){
            setPageRatingHelmet(pageRatings.data.filter(obj=>(obj.page===pathname)))
        }
    },[pathname,pageRatings]);

  useEffect(() => {
    const title1=workArr.filter(obj=>(obj.id===2))[0].title
    setTitle(title1);
    setStyleName("Style 3");
    setChangePage(false);;
    if(window.scrollY){
      window.scroll(0,0);
      
  }
  }, [setTitle, setStyleName,setChangePage,workArr]);

  useEffect(()=>{
    let arr=[];
    if(getProductDesigns.loaded){
        let obj=getProductDesigns.data.filter(obj=>(obj.name==="ImageWall"))[0]
        let kewds=obj.desc.split(" ")
        .filter(wd=>(wd !=="the"))
        .filter(wd=>(wd !=="This"))
        .filter((wd)=>(wd !=="a"))
        .filter(wd=>(wd !=="for"))
        .filter(wd=>(wd !=="in"))
        .filter(wd=>(wd !=="is"))
        .filter(wd=>(wd !=="of"))
        .filter(wd=>(wd !=="are"))
        setSummary(obj.summary);
        setDesc(obj.desc);
        setKeywords(kewds);
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
},[getProductDesigns.loaded,getProductDesigns.data,staticImage]);

  
  useEffect(()=>{
    const getUser_id=localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")):null;
    if(getUser_id){
        setShowPurchaseBtn(true);
    }
},[])

  return (
    <>
    <GetRegisterPages/>
    <Design3Helmet 
    summary={summary} 
    desc={desc}
     image={image}
     keywords={keywords}
     OBJ={OBJ}
     average={average}
     getPathLocation={getPathLocation.loaded ? getPathLocation.data:""}
     pageRatings={pageRatingHelmet}
     />
    <div className="container-fluid" style={{ posistion: "relative", width: "100vw", display: "flex", justifyContent: "flex-start", alignItems: "center",flexDirection:"column" }}>
      <RegisterPage/>
      <ImagesContainer />
    </div>
    <Included product={OBJ} staticImage={staticImage}/>
    <Container maxWidth="xs">
    <Stack direction="column" sx={{ margin: "1rem auto" }}>
      { showPurchaseBtn ? <UserSignedInPurchaseBtn />
      :

      <ModalContainer />}
    </Stack>
    <Typography component="h1" variant="h5" sx={{textAlign:"center",margin:"1rem auto"}}>Please comment on the design,below. We strive to improve.</Typography>
        <PageFeedback/>
  </Container>
  </>

  )
}

export default Page1