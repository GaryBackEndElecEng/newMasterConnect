import React, { useContext, useEffect, useState, useRef } from 'react';
import {useLocation} from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import {  Stack,  Typography, Grid, Container,  Card, CardMedia, CardContent } from '@mui/material';
import Styles from './wedding.module.css';
import Banner from './Banner';
import PageFeedback from '../utils/PageFeedback';
import PageRating from '../utils/PageRating';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import Contribute from './Contribute';
import WeddingHelmet from './WeddingHelmet';
import CoverPage from './CoverPage';
import WeddingCardTable from './WeddingCardTable';

const MainContainer = styled.div.attrs({ className: "weddingContainer" })`
position:relative;
width:100vw;
min-height:137vh;
margin:0;padding:0;
// margin-top:-1.4rem;
z-index:1;
animation:appearIn 1.5s ease-in-out;
@keyframes appearIn {
  from (opacity:0;)
  to (opacity:1;)
}
@media screen and (max-width:600px){
  min-height:152vh;
}
`;



const Design6Wedding = () => {
  const location=useLocation();
    const pathname=location.pathname;
  const theme = useTheme();
  const { staticImage, workArr, setTitle, setStyleName,productDesigns,getPathLocation,pageRatings,average } = useContext(GeneralContext);
  const weddingSky = `${staticImage}/design8/clouds.png`;
  const weddingTrees = `${staticImage}/weddingTrees.png`;
  const weddingTable = `${staticImage}/weddingTable.png`;
  const flower = "https://resources.ediblearrangements.ca/resources/en-us/i/a/Deluxe_Fresh_Celebrations_Flower_Bundle.jpg";
  const [weddingSkyPx, setWeddingSkyPx] = useState(0);
  const [weddingTreePx, setWeddingTreePx] = useState(0);
  const [showPurchaseBtn, setShowPurchaseBtn] = useState(false);
  const [flowerSeen, setFlowerSeen] = useState(false);
  const [weddingTableSeen, setWeddingTableSeen] = useState(false);
  const [keywords,setKeywords]=useState(null);
  const [summary,setSummary]=useState(null);
  const [image,setImage]=useState(null);
  const [desc,setDesc]=useState(null);
  const [OBJ,setOBJ]=useState({});
  const activateWeddingTable = weddingTableSeen ? "block" : "none";
  const [pageRatingHelmet,setPageRatingHelmet]=useState([]);
    
    useEffect(()=>{
        if(pageRatings.loaded && pageRatings.data){
            setPageRatingHelmet(pageRatings.data.filter(obj=>(obj.page===pathname)))
        }
    },[pathname,pageRatings]);

    useEffect(()=>{
      let arr=[];
      if(productDesigns.loaded){
        let weddingPage=productDesigns.data.filter(obj=>(parseInt(obj.id)===8))[0]
        setOBJ(weddingPage);
        
      setKeywords(
        [weddingPage.name,"Design","Page Design","design page","master-connect"]
        );
      setSummary(weddingPage.summary);
      setDesc(weddingPage.desc);
      setImage(`${staticImage}/${weddingPage.imageName}`);

   
      }
      if(window.scrollY){
        window.scroll(0,0);
        
    }
    
    },[productDesigns.loaded,productDesigns.data,staticImage,setOBJ,setSummary,setDesc])

  useEffect(() => {
    const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : null;
    if (getUser_id) {
      setShowPurchaseBtn(true)
    }

  }, [])

  useEffect(() => {
    const title1 = workArr.filter(obj => (obj.id === 6))[0].title
    setTitle(title1);
    setStyleName("A wedding")
  }, [setTitle, setStyleName,workArr]);

  useEffect(() => {
    const funcScroll = () => {
      let lastKnownScrollPosition = 0;
      let ticking = false;

      function doSomething(scrollPos) {
        setWeddingSkyPx(Math.floor(scrollPos / 5) < 90 ? scrollPos / 5 : 90);
        setWeddingTreePx(Math.floor(-scrollPos / 10) > -60 ? Math.floor(-scrollPos / 10) : -60);
        if (scrollPos < 30) {
          setFlowerSeen(false);
          setWeddingTableSeen(false);
        }

      }

      document.addEventListener('scroll', (e) => {
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
          window.requestAnimationFrame(() => {
            doSomething(lastKnownScrollPosition);
            ticking = false;
          });

          ticking = true;
        }
      });
    }
    funcScroll()
  }, []);


  return (
    <MainContainer
    className={Styles.mainContainer}
    >
      
      <WeddingHelmet 
      summary={summary}
       desc={desc}
       image={image}
       keywords={keywords}
       OBJ={OBJ}
       getPathLocation={getPathLocation.loaded ? getPathLocation.data:""}
       pageRatings={pageRatingHelmet}
       average={average !==0 ? average:"4"}
       />
      <GetRegisterPages/>
        <RegisterPage />
        <PageRating/>
        <CoverPage
          weddingSky={weddingSky}
          weddingTreePx={weddingTreePx}
          weddingTree={weddingTrees}
          
          />
        
          <Banner 
          bg={theme.palette.common.blueFade}
          color={theme.palette.common.orangeFade2}
          />
        <WeddingCardTable
        flower={flower}
        weddingTable={weddingTable}
        bg={theme.palette.common.blueFade}
        />
       
      
      <Contribute bg={theme.palette.common.blueFade}/>
      <Container maxWidth="md">
        <Stack direction="column" sx={{ margin: "1rem auto" }}>
        <Typography component="h1" variant="h5" sx={{textAlign:"center",margin:"1rem auto",color:"black"}}>Please comment on the design,below. We strive to improve.</Typography>
        <PageFeedback/>
        </Stack>
      </Container>
    </MainContainer>
  )
}

export default Design6Wedding