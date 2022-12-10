import React, { useState, useContext, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { Stack, Box, Switch, Typography,Container } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import CoverPage from './CoverPage';
import styled from 'styled-components';
import Design9Helmet from './Design9Helmet';
import ModalContainer from '../utils/ModalContainer';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import PageFeedback from '../utils/PageFeedback';
import PageRating from '../utils/PageRating';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
// import styles from './design9.module.css'
import { useTheme } from '@mui/material/styles';
import Projects from './Projects';
import thisArray from './realstateArr.json';
import frenchArray from './realstateArrFr.json';



const CustomBox = styled(Box)`
margin:auto;
margin-top:5px;
width:100vw;
position:relative;
background-color:${({ bg }) => bg};
animation: smoothIn 1s ease-in-out;
@keyframes smoothIn {
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:600px){
  margin-top:-55px;
}
`;

const Design9 = () => {
  const location=useLocation();
    const pathname=location.pathname;
  const theme = useTheme();
  const { setTitle, setStyleName, setChangePage, staticImage,average,conical,getPathLocation,pageRatings } = useContext(GeneralContext);
  const { getProductList } = useContext(PriceContext);
  const {paid}=useContext(TokenAccessContext);
  const [frenchEnglish, setFrenchEnglish] = useState({ language: thisArray });
  const [showPurchaseBtn, setShowPurchaseBtn] = useState(false);
  const [turnOn, setTurnedOn] = useState(false);
  const [summary, setSummary] = useState(false);
  const [desc, setDesc] = useState(false);
  const [keywords, setKeywords] = useState(false);
  const [image, setimage] = useState(false);
  const [OBJ, setOBJ] = useState(false);
  const [lang, setLang] = useState(false);
  const [pageRatingHelmet,setPageRatingHelmet]=useState([]);
    
    useEffect(()=>{
        if(pageRatings.loaded && pageRatings.data){
            setPageRatingHelmet(pageRatings.data.filter(obj=>(obj.page===pathname)))
        }
    },[pathname,pageRatings]);

  useEffect(() => {
    setTitle("Realtor");
    setStyleName("Realtor Page");
    setChangePage(false);
  }, [setTitle,setStyleName,setChangePage]);

  useEffect(() => {
    if (getProductList.loaded && getProductList.data) {
      let obj = getProductList.data.filter(obj => (obj.name === "Realstate"))[0];
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

  const checkedOn = (e) => {
    setTurnedOn(e.target.checked)
    if (e.target.checked === true) {
      setFrenchEnglish({ language: frenchArray });
      setLang(true);
    }
    if (e.target.checked === false) {
      setFrenchEnglish({ language: thisArray });
      setLang(false)
    }
  }
  useEffect(() => {
    const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null;
    if (getUser_id) {
      setShowPurchaseBtn(true);
    }
  }, []);
  return (
    <>
    <GetRegisterPages/>
    <RegisterPage/>
    <PageRating/>
    <CustomBox bg={theme.palette.common.lighter}>
      <Design9Helmet 
      summary={summary}
       desc={desc}
       image={image}
       keywords={keywords}
       OBJ={OBJ}
       average={average !==0 ? average:"4"} 
       getPathLocation={getPathLocation.loaded ? getPathLocation.data :""}
       pageRatings={pageRatingHelmet}
      />
      <Stack direction="row"
        sx={{ justifyContent: "center", alignItems: "center", position: "absolute", right: "7%", top: { md: "3.5%", xs: "0%" }, zIndex: "1000", background: theme.palette.common.fadeCharcoal, padding: { md: "0.5rem", xs: "0.25rem" }, color: "white" }}
      >
        {turnOn === true ?
          <Typography component="h1" variant="h5">to english</Typography>
          :
          <Typography component="h1" variant="h5">en francais</Typography>
        }
        <Switch checked={turnOn} onChange={(e) => checkedOn(e)} />
      </Stack>
      <CoverPage lang={lang} />
      <Projects language={frenchEnglish.language} turnOn={turnOn} />

    </CustomBox>
    <Container maxWidth={"md"}>
        {!paid && <Stack direction={"column"} sx={{ margin: "1rem auto" }}>
          {showPurchaseBtn ? <UserSignedInPurchaseBtn />
            :
            <ModalContainer />}
        </Stack>}
        <Typography component="h1" variant="h5" sx={{textAlign:"center",margin:"1rem auto"}}>Please comment on the design,below. We strive to improve.</Typography>
        <PageFeedback/>
      </Container>
    </>
  )
}

export default Design9