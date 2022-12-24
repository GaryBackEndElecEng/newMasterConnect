import React, { useContext, useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {TokenAccessContext} from '../../context/TokenAccessProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Stack, Card, CardMedia, Typography, Box, Container, Grid } from '@mui/material';
import CoverPage from './CoverPage';
import styles from './solar.module.css';
import api from '../axios/api';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import PageRating from '../utils/PageRating';
import PageFeedback from '../utils/PageFeedback';
import ModalContainer from '../utils/ModalContainer';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import HelmetPrep from './HelmetPrep';


const Solarmain = styled.div`
width:100vw;
margin:0;
margin-top:5px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:flex-start;
position:relative;

@media screen and (max-width:900px){
  margin-top:-5px;
}
@media screen and (max-width:800px){
  margin-top:-5px;
}
@media screen and (max-width:600px){
  margin-top:-55px;
}
`;
const SolarPanel = () => {
  const location=useLocation();
  const pathname=location.pathname;
  const theme = useTheme();
  const { staticImage, setTitle, setStyleName,average,getPathLocation,pageRatings,getProductDesigns } = useContext(GeneralContext);
  const { paid } = useContext(TokenAccessContext);
  const [getArray, setGetArray] = useState([]);
  const staticUrl = `${staticImage}/solar`;
  const [solarDesc, setSolarDesc] = useState({ loaded: false, data: [] });
  const [keywords, setKeywords] = useState([]);
  const [desc, setDesc] = useState("");
  const [pageRatingHelmet, setPageRatingHelmet] = useState([]);
  const [productPrice,setProductPrice]=useState(null);
  const [showPurchaseBtn, setShowPurchaseBtn] = useState(false);
  const image=`${staticImage}/design13.pnd`;

  

  useEffect(() => {
    const getDescription = async () => {
      let arr = [];
      try {
        const res = await api.get('category/');
        const category = res.data;
        let getSolarArr = category.filter(obj => (obj.name === "Solar"))[0].catWordSnippet;
        let descObj = getSolarArr.filter(obj => (obj.title === "Description"))[0];
        if (descObj) {
          arr.push({ id: 0, desc: descObj.content });
          arr.push({ id: 1, desc: descObj.content1 });
          arr.push({ id: 2, desc: descObj.content2 });
          arr.push({ id: 3, desc: descObj.content3 });
        }
        let descObj1 = getSolarArr.filter(obj => (obj.title === "Description2"))[0]
        if (descObj1) {
          arr.push({ id: 4, desc: descObj1.content });
          arr.push({ id: 5, desc: descObj1.content1 });
          arr.push({ id: 6, desc: descObj1.content2 });
          arr.push({ id: 7, desc: descObj1.content3 });
        }
        setSolarDesc({ loaded: true, data: arr })
      } catch (error) {
        console.error(error.message);
      }
    }
    getDescription();
  }, []);

  useEffect(() => {
    setTitle("Solar Store");
    setStyleName("Tommorrows way");
    const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null;
    if (getUser_id) {
        setShowPurchaseBtn(true);
    }
  }, [setShowPurchaseBtn,setTitle,setStyleName]);

  useEffect(() => {
    const arrPhotos = [
      { id: 0, title: "Solar-kit", image: "solar1.png", summary: "Solar kit for the home owner",page:"/design13" },
      { id: 1, title: "Composite", image: "solar2.png", summary: "mult-layer composite technology",page:"/design13" },
      { id: 2, title: "79% energy capture", image: "solar3.png", summary: "30% parabula fit for continued sun capture from sunrise to dusk",page:"/design13" },
      { id: 3, title: "800 WATT Kit", image: "solar4.png", summary: "1500-3000W static converters,Water/weatherproof junction box with lock-connects,water/weatherproof TCP/IP reader and GW4 100ft cables ",page:"/design13" },
      { id: 4, title: "mult-fit assembly", image: "solar5.png", summary: "easy assembly perspect ",page:"/design13" },
      { id: 5, title: "Parabolic solar-panel", image: "solar6.png", summary: "no servo-static installation solar panels with anti-stick water/ice glass index",page:"/design13" },
      { id: 6, title: "Effective Solar Use", image: "solar7.png", summary: "Multi-uses to recapture the power of our sun in a battery",page:"/design13" },
      { id: 7, title: "cause-and-effect", image: "solar8.png", summary: "continual charge while camping to garranteed power in comfort",page:"/design13" },
      { id: 8, title: "cause-and-effect", image: "solar9.png", summary: "Power for marin devises when at dock or out in the ocean. Having power when you your life depends on it.",page:"/design13" },
    ]
    let getProductPrice=0
    if(getProductDesigns.loaded){
      getProductPrice=getProductDesigns.data.filter(obj=>(obj.extra_kwargs===pathname))[0].monthly
    }else{getProductPrice=15}
    
    let arr = [];
    arrPhotos.forEach((obj, index) => {
      let checkSolarDesc = solarDesc.data.filter(obj1 => (parseInt(obj1.id) === parseInt(obj.id)))[0];
      if (checkSolarDesc) {
        arr.push({ ...obj, desc: checkSolarDesc.desc,monthly:getProductPrice })
      }
    });
    setGetArray(arr);
  }, [setGetArray, solarDesc,getProductDesigns,pathname]);

  return (
    <Solarmain
    >
      <HelmetPrep
      getArray={getArray ? getArray :null}
      staticImage={staticImage}
      image={image}
      average={average}
      getPathLocation={getPathLocation}
      pageRatings={pageRatings.loaded ? pageRatings.data:null}
      />
      <CoverPage staticImage={staticImage} getArray={getArray ? getArray : null} />
      <RegisterPage />
      <GetRegisterPages />
      <PageRating />
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 0, sm: 1, md: 2 }}>
          {getArray.map((obj, index) => (
            <Grid item xs={12} md={4}
              key={`${obj.id}-Solar-${index}`}
              sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", position: "relative" }}
            >
              <Typography component="h1" variant="h3" sx={{ margin: "1rem auto" }}>{obj.title}</Typography>
              <img src={`${staticUrl}/${obj.image}`} alt="www.masterconnect.ca" style={{ width: "100%" }} />
              <Typography component="p" variant="body1" className={styles.twoColumn}>
                {obj.desc}
              </Typography>
            </Grid>
          ))}

        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ margin: "1rem auto" }}>
                <Typography component="h1" variant="h4" sx={{ textAlign: "center", margin: "1rem auto" }}>Please comment - we aim to improve</Typography>
                <PageFeedback />
                {!paid && <Stack direction="column" sx={{ margin: "1rem auto" }}>
                    {showPurchaseBtn ? <UserSignedInPurchaseBtn />
                        :
                        <ModalContainer />}
                </Stack>}
            </Container>


    </Solarmain>
  )
}

export default SolarPanel