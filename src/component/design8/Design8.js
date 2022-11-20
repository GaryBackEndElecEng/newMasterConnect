import React, { useEffect, useContext, useState } from 'react';
import { Stack, Container, Typography, } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import ModalContainer from '../utils/ModalContainer';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import PageRating from '../utils/PageRating';
import PageFeedback from '../utils/PageFeedback';
import CoverPage from './CoverPage';
import Banner from './Banner';
import BannerTwo from './BannerTwo';
import BannerThree from './BannerThree';
import styled from 'styled-components';
import Design8Helmet from './Design8Helmet';



const Main = styled.div`
margin:auto;
width:100vw;
min-height:105vh;
overflow:hidden;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
animation: clearIn 2s ease-in-out;
@keyframes clearIn {
  from {opacity:0;}
  to {opacity:1;}
}
@media screen and (max-width:900px){
    
}
@media screen and (max-width:600px){
margin-top:-50px;
}
`;



const Design8 = () => {
  const { setTitle, setStyleName, setChangePage, staticImage,average } = useContext(GeneralContext);
  const { getProductList } = useContext(PriceContext);
  const [summary, setSummary] = useState(false);
  const [desc, setDesc] = useState(false);
  const [keywords, setKeywords] = useState(false);
  const [image, setimage] = useState(false);
  const [OBJ, setOBJ] = useState(false);
  const [showPurchaseBtn, setShowPurchaseBtn] = useState(false);
  useEffect(() => {
    setTitle("Success");
    setStyleName("Success Page here");
    setChangePage(false);
  }, [setTitle,setStyleName,setChangePage]);

  useEffect(()=>{
    const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null;
    if (getUser_id) {
      setShowPurchaseBtn(true);
    }
  },[setShowPurchaseBtn,showPurchaseBtn]);
  
  useEffect(() => {
    if (getProductList.loaded && getProductList.data) {
      let obj = getProductList.data.filter(obj => (obj.name === "Success"))[0];
      let kewds = obj.desc.split(" ")
        .filter(wd => (wd !== "the"))
        .filter(wd => (wd !== "This"))
        .filter((wd) => (wd !== "a"))
        .filter(wd => (wd !== "for"))
        .filter(wd => (wd !== "in"))
        .filter(wd => (wd !== "is"))
        .filter(wd => (wd !== "of"))
        .filter(wd => (wd !== "are"))
        .filter(wd => (wd !== "and"))
      setSummary(obj.summary);
      setDesc(obj.desc);
      setKeywords(kewds);
      setimage(`${staticImage}/${obj.imageName}`);
      setOBJ(obj)
    }
    if (window.scrollY) {
      window.scroll(0, 0);

    }
  }, [getProductList.loaded, getProductList.data, staticImage]);

  return (
    <Main>
      <Design8Helmet summary={summary} desc={desc} image={image} keywords={keywords} OBJ={OBJ} average={average} />
      <RegisterPage />
      <GetRegisterPages />
      <PageRating/>
      <CoverPage />
      <Banner />
      <BannerTwo />
      <BannerThree />
      <Container maxWidth="md">
        <Stack direction="column" sx={{ margin: "1rem auto" }}>
          {showPurchaseBtn ? <UserSignedInPurchaseBtn />
            :
            <ModalContainer />}
        </Stack>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center", margin: "1rem auto" }}>Please comment on the design,below. We strive to improve.</Typography>
        <PageFeedback />
      </Container>
    </Main>
  )
}

export default Design8