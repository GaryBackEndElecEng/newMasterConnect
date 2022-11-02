import React, { useContext, useEffect, useState, } from 'react';
// import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import {  Fab, Grid, Typography, } from '@mui/material';
import styled from 'styled-components';
import PageFeedback from '../utils/PageFeedback';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import api from '../axios/api';
import ArticlePage from './ArticlePage';
import TopCoverPage from './TopCoverPage';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
// import SickIcon from '@mui/icons-material/Sick';
// import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CarRentalIcon from '@mui/icons-material/CarRental';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LanguageIcon from '@mui/icons-material/Language';
import Rotate90DegreesCwIcon from '@mui/icons-material/Rotate90DegreesCw';
import ArticleHelmet from './ArticleHelmet';


const MainBlog = styled.div.attrs({ className: "container-fluid" })`
width:100vw;
postion:relative;
margin:2rem auto;
margin-top:0.25rem;
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
background:${({ bg }) => bg};
@media screen and (max-width:900px){
    margin-top:0px;
}
@media screen and (max-width:600px){
    margin-top:-50px;
}
`;
const MainCoverPage = styled.div.attrs({ className: "container-fluid" })`
width:90%;
margin: auto;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
box-shadow:1px 1px 18px 10px ${({boxShadow})=>boxShadow};
background-image:url(${({ bgImage }) => bgImage});
background-size:100% 100%;
min-height:46vh;
@media screen and (max-width:900px){
    margin-top:0px;
}
@media screen and (max-width:600px){
    margin-top:0px;
}
`;


const Article = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const { setTitle, setStyleName, staticImage} = useContext(GeneralContext);
  const [changeArticle, setChangeArticle] = useState(null);
  const [glacier, setGlacier] = useState({ loaded: false, data: [] });
  const [lightning, setLightning] = useState({ loaded: false, data: [] });
  const [covid, setCovid] = useState({ loaded: false, data: [] });
  const [corporatePortal, setCorporatePortal] = useState({ loaded: false, data: [] });
  const [article, setArticle] = useState(null);
  const [storeFront, setStoreFront] = useState({});
  const [connecting, SetConnecting] = useState({});
  const [shortTerm, setShortTerm] = useState({});
  const [cognitive, setCognitive] = useState({});
  const [sixDegree, setSixDegree] = useState({});
  const [internet, setInternet] = useState({});
  const [OBJs, setOBJs] = useState([]);
  const bgImage=`${staticImage}/work.png`;
  const [innerW, setInnerW] = useState(false);
  const changeColor = innerW ? theme.palette.fade : theme.palette.common.light;
  const boxShadow= innerW ? "white" : theme.palette.common.blueGrey;
  const getTitle= article ? article.title : " Article page";

  const [summary, setSummary] = useState(null);
  const [keywords, setKeywords] = useState(null);
  const [desc, setDesc] = useState(null);
  const [images, setImages] = useState(null);

  useEffect(()=>{
    if(storeFront.loaded && connecting.loaded && shortTerm.loaded && cognitive.loaded && sixDegree.loaded){
      let arr=[],arr2=[],arr3=[];
      arr.push(storeFront.data.section);
      arr.push(connecting.data.section);
      arr.push(shortTerm.data.section);
      arr.push(cognitive.data.section);
      arr.push(sixDegree.data.section);
      arr.push(internet.data.section);
      arr.push(glacier.data.section);
      arr.push(lightning.data.section);
      setKeywords(arr);
      setSummary("A page that provides 9-Amazing Articles for the intrigued.")
      arr2.concat(storeFront.data.subSection);
      arr2.concat(connecting.data.subSection);
      arr2.concat(shortTerm.data.subSection);
      arr2.concat(cognitive.data.subSection);
      arr2.concat(sixDegree.data.subSection);
      arr2.concat(internet.data.subSection);
      arr2.push(glacier.data.section);
      arr2.push(lightning.data.section);
      setDesc(arr2)
      arr3=[storeFront.data,connecting.data,shortTerm.data,cognitive.data,sixDegree.data,internet.data,]
      setOBJs(arr3)
      
      setImages([storeFront.data.imageSection,connecting.data.imageSection,shortTerm.data.imageSection,cognitive.data.imageSection,sixDegree.data.imageSection,internet.data.imageSection,lightning.data,glacier.data])
    }
  },[storeFront.loaded,connecting.loaded,shortTerm.loaded,cognitive.loaded,sixDegree.loaded,internet.loaded]);

  const ButtonArray=[

    {id:0,name:"Thwaites Glacier",icon:<DeviceThermostatIcon sx={{ ml: 1, color: "red",margin:"5px" }} />,click:() => setChangeArticle("twaites")},
    {id:1,name:"Phenamena of",icon:<ElectricBoltIcon sx={{ ml: 1, color: "red",margin:"5px" }} />,click:() => setChangeArticle("lightning")},
    {id:2,name:"Impact of Covid",icon:<CoronavirusIcon sx={{ ml: 1, color: "red",margin:"5px" }} />,click:() => setChangeArticle("covid")},
    {id:3,name:"Client-Seller Acuity loss",icon:<CorporateFareIcon sx={{ ml: 1, color: "red",margin:"5px" }} />,click:() => setChangeArticle("portal")},
    {id:4,name:"6-degrees of connecting",icon:<Rotate90DegreesCwIcon sx={{ ml: 1, color: "red",margin:"5px" }} />,click:() => setChangeArticle("6deg")},
    {id:5,name:"Connecting to Ecommerce",icon:<ConnectWithoutContactIcon sx={{ ml: 1, color: "red",margin:"5px" }} />,click:() => setChangeArticle("connecting")},
    {id:6,name:"A Great Store-front",icon:<StorefrontIcon sx={{ ml: 1, color: "red",margin:"5px" }} />,click:() => setChangeArticle("store")},
    {id:7,name:"Short-term for sale",icon:<CarRentalIcon sx={{ ml: 1, color: "red",margin:"5px" }} />,click:() => setChangeArticle("short-term")},
    {id:8,name:"Cognitive-easing",icon:<PsychologyIcon sx={{ ml: 1, color: "red",margin:"5px" }} />,click:() => setChangeArticle("cognitive")},
    {id:9,name:"Connecting To The Internet",icon:<LanguageIcon sx={{ ml: 1, color: "red",margin:"5px" }} />,click:() => setChangeArticle("internet")},

  ]

  useEffect(() => {
    const getApiArticles = async () => {
      try {
        const res = await api.get('/blog/articles/');
        const body = res.data;
        setGlacier({ loaded: true, data: body.filter(obj => (obj.title === "Dooms Day Glacier"))[0] });
        setLightning({ loaded: true, data: body.filter(obj => (obj.title === "The Phenomena of lightning"))[0] });
        setCovid({ loaded: true, data: body.filter(obj => (obj.title === "Changed Trends - COVID"))[0] });
        setCorporatePortal({ loaded: true, data: body.filter(obj => (obj.title === "CORPORATE PORTAL- Alignment services"))[0] });
        SetConnecting({ loaded: true, data: body.filter(obj => (obj.title === "Connecting"))[0] });
        setStoreFront({ loaded: true, data: body.filter(obj => (obj.title === "Store-front"))[0] });
        setShortTerm({ loaded: true, data: body.filter(obj => (obj.title === "short-term-rental"))[0] });
        setCognitive({ loaded: true, data: body.filter(obj => (obj.title === "Cognitive Easing"))[0] });
        setSixDegree({ loaded: true, data: body.filter(obj => (obj.title === "6-degrees of connecting"))[0] });
        setInternet({ loaded: true, data: body.filter(obj => (obj.title === "Connecting To the Internet"))[0] });

      } catch (error) {
        console.error(error.message)
      }
    }
    getApiArticles();
  }, []);
  useEffect(() => {
    if (window.innerWidth < 900) {
      setInnerW(true);
    }

  }, []);
  useEffect(() => {
    if (changeArticle === "twaites") {
      let temp = glacier.loaded ? glacier.data : null;
      setArticle(temp)
    }
    else if (changeArticle === "lightning") {
      let temp = lightning.loaded ? lightning.data : null;
      setArticle(temp)
    }
    else if (changeArticle === "covid") {
      const getCovid = covid.loaded ? covid.data : null;
      setArticle(getCovid)
    }
    else if (changeArticle === "portal") {
      const getCorporatePortal = corporatePortal.loaded ? corporatePortal.data : null;
      setArticle(getCorporatePortal)
    }
    else if (changeArticle === "connecting") {
      const getConnecting = connecting.loaded ? connecting.data : null;
      setArticle(getConnecting)
    }
    else if (changeArticle === "store") {
      const getStoreFront = storeFront.loaded ? storeFront.data : null;
      setArticle(getStoreFront)
    }
    else if (changeArticle === "short-term") {
      const getShortTerm = shortTerm.loaded ? shortTerm.data : null;
      setArticle(getShortTerm)
    }
    else if (changeArticle === "cognitive") {
      const getCognitive = cognitive.loaded ? cognitive.data : null;
      setArticle(getCognitive)
    }
    else if (changeArticle === "6deg") {
      const get6Degree = sixDegree.loaded ? sixDegree.data : null;
      setArticle(get6Degree)
    }
    else if (changeArticle === "internet") {
      const getInternet = internet.loaded ? internet.data : null;
      setArticle(getInternet)
    }
  }, [setArticle, changeArticle, lightning, glacier, covid, corporatePortal, connecting, storeFront, shortTerm,cognitive,sixDegree])


  useEffect(() => {
    setTitle("Articles");
    setStyleName("Articles");
    if(window.scrollY){
      window.scroll(0,0);
      
  }
  }, [setTitle, setStyleName]);

  const handleMouseOver=(e)=>{
    if(e.currentTarget.children[0]){
      let ele= e.currentTarget.children[0]
      ele.style.transform="scale(1.5)";
      ele.style.marginLeft="20px";
      ele.style.color="blue";

    }
  }
  const handleMouseOut=(e)=>{
    if(e.currentTarget.children[0]){
      let ele= e.currentTarget.children[0]
      ele.style.transform="scale(1)";
      ele.style.marginLeft="";
      ele.style.color="";
      
    }
  }


  return (
    <MainBlog bg={changeColor}>
      <RegisterPage />
      <GetRegisterPages/>
      <ArticleHelmet 
      summary={summary} 
      desc={desc} 
      keywords={keywords} 
      images={images} 
      OBJs={OBJs}
      article={getTitle}
      />
      <TopCoverPage/>
      <MainCoverPage
      bgImage={bgImage}
      boxShadow={boxShadow}
      >
      <Grid container spacing={{ xs: 1, md: 2 }}
      sx={{padding:"1rem",display:"flex",justifyContent:"center",alignItems:"center"}}
      >{ButtonArray && ButtonArray.map(obj=>(
        <Grid item xs={12} sm={4} md={4} key={obj.id} 
        sx={{margin:"auto",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}
        >
          <Fab variant="extended"   onClick={obj.click} sx={{padding:"0.5rem",border:"1px solid black",color:"white",background:theme.palette.common.orangeFade2,"&:hover":{color:"black",transform:"scale(1.1)"}}} onMouseOver={(e)=>handleMouseOver(e)} onMouseOut={(e)=>handleMouseOut(e)}>
            {obj.name}{obj.icon}
          </Fab>
        
          </Grid>
            ))}
          
      </Grid>
      </MainCoverPage>
      
      { article && <ArticlePage getArticle={article} /> }

      <Typography component="h1" variant="h5" sx={{textAlign:"center",margin:"1rem auto"}}>Please comment on the design,below. We strive to improve.</Typography>
        <PageFeedback/>
    </MainBlog >
  )
}

export default Article