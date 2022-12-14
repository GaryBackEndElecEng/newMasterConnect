import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Box, Stack, AppBar, Typography, Grid, Container, Paper, Fab, Button, SpeedDial, Card, CardMedia, CardContent } from '@mui/material';
import { ContainerHomeFluid } from '../../styled/Container.styled';
import Styles from './wedding.module.css'
import SpaIcon from '@mui/icons-material/Spa';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModalContainer from '../utils/ModalContainer';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import Contribute from './Contribute';
import WeddingHelmet from './WeddingHelmet';

const MainContainer = styled.div.attrs({ className: "weddingContainer" })`
position:relative;
width:100vw;
min-height:137vh;
margin:0;padding:0;
margin-top:-1.4rem;
z-index:1;
@media screen and (max-width:600px){
  min-height:152vh;
}
`;
const MainContainer2 = styled.div.attrs({ className: "weddingContainer" })`
position:relative;
margin-top:14rem;
width:100vw;
min-height:100vh;
margin:0;padding:0;
margin-top:1vh;
z-index:1;
`;
const WeddingSkyImg = styled.img`
position:absolute;
left:0%;
top:2%;
width:100%;
min-height:100vh;

`;

const WeddingTreeImg = styled.img`
position:absolute;
left:0%;
width:100%;
zIndex:4;
min-height:100vh;
transform:translate3d(0px,${({ transY }) => transY}px,${({ transZ }) => transZ}px);

`;
const WeddingMsg = styled.div`
position:absolute;
   top:20%;
   left:33%; 
   margin:auto;
   z-index:2;
   transform:translate3d(0px,${({ transY }) => transY}px,${({ transZ }) => transZ}px);
   box-shadow: 10px 10px ${({ shad }) => shad}px white,-10px -10px ${({ shad }) => shad}px white;
   max-width:600px;
   display:flex;
   justify-content:center;
   align-items:center;
   @media screen and (max-width:900px){
    left:12%;
   }
   @media screen and (max-width:600px){
    left:0%;
   }
`;
const Banner = styled.div`
position:absolute;
top:73%;
background:${({ bg }) => bg};
min-height:40vh;
width:100%;
transform:translate3d(0px,${({ transY }) => transY}px,${({ transZ }) => transZ}px);
color:${({ color }) => color};
@media screen and (max-width:600px){
  top:66%;
}
`;
const CustImg = styled.img`
opacity:1;
animation:viewTable 20s ease-in;
@keyframes viewTable {
  from {
    opacity:1;
    transform:translate(-1000px,-700px);
  }
  50% {
    opacity:1;
    transform:translate(0px,100px);
  }
  to {
    opacity:1;
    transform:translate(-500px,-350px);
  }
}

`;
const MainWeddingContainer = styled.div`
marginLeft:"0px";
margin:auto;
margin-top:0px;

@media screen and (max-width:900px){
  margin-top:-30px
}
@media screen and (max-width:600px){
 margin-top:-80px;
}
`;

const Design6Wedding = () => {
  const theme = useTheme();
  const flowerRef = useRef();
  const weddingTableRef = useRef();
  const { staticImage, workArr, setTitle, setStyleName,loadProduct } = useContext(GeneralContext);
  const { user_id } = useContext(TokenAccessContext);
  const weddingSky = `${staticImage}/weddingSky.png`;
  const weddingTrees = `${staticImage}/weddingTrees.png`;
  const weddingTable = `${staticImage}/weddingTable.png`;
  const flower = "https://resources.ediblearrangements.ca/resources/en-us/i/a/Deluxe_Fresh_Celebrations_Flower_Bundle.jpg";
  const [weddingSkyPx, setWeddingSkyPx] = useState(0);
  const [weddingTreePx, setWeddingTreePx] = useState(0);
  const [showPurchaseBtn, setShowPurchaseBtn] = useState(false);
  const [weddingTableY, setWeddingtableY] = useState(0);
  const [flowerSeen, setFlowerSeen] = useState(false);
  const [weddingTableSeen, setWeddingTableSeen] = useState(false);
  const [keywords,setKeywords]=useState(null);
  const [summary,setSummary]=useState(null);
  const [image,setImage]=useState(null);
  const [desc,setDesc]=useState(null);
  const [OBJ,setOBJ]=useState({});
  const activateWeddingTable = weddingTableSeen ? "block" : "none";

    useEffect(()=>{
      if(loadProduct.loaded){
        let weddingPage=loadProduct.data.filter(obj=>(parseInt(obj.id)===8))[0]
      setKeywords(
        [weddingPage.name,"Design","Page Design","design page","master-connect"]
        );
      setSummary(weddingPage.summary);
      setDesc(weddingPage.desc)
      setImage(`${staticImage}/${weddingPage.imageName}`)
      setOBJ(weddingPage)
      }
      if(window.scrollY){
        window.scroll(0,0);
        
    }
      
    },[loadProduct.loaded,loadProduct.data])

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
  }, [setTitle, setStyleName]);

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



  useEffect(() => {
    const getObserver = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          let child = entry.target
          if (entry.isIntersecting && child === flowerRef.current) {
            setFlowerSeen(true);
          }
          if (entry.isIntersecting) {
            setWeddingTableSeen(true);
          }
        })
      }, { threshold: 1 })
      observer.observe(flowerRef.current)
      observer.observe(weddingTableRef.current)

    }
    getObserver();
  }, [setFlowerSeen, flowerSeen]);

  return (
    <MainWeddingContainer>
      < >
      <WeddingHelmet summary={summary} desc={desc} image={image} keywords={keywords} OBJ={OBJ} />
      <GetRegisterPages/>
        <RegisterPage />
        <MainContainer>

          <WeddingSkyImg

            boxdisp={Math.floor(weddingSkyPx / 2)}
            src={weddingSky} alt="www.master-connect.ca"
            className={Styles.weddingSky} />

          <WeddingTreeImg
            transY={weddingTreePx}
            transZ={-weddingTreePx}
            boxX={Math.floor(weddingTreePx / 3)}
            boxY={Math.floor(weddingTreePx / 3)}
            boxdisp={Math.floor(weddingTreePx / 2)}
            src={weddingTrees} alt="www.master-connect.ca"
            className={Styles.weddingTree} />
          <WeddingMsg
            transY={weddingSkyPx}
            transZ={weddingSkyPx * -2}
            shad={weddingSkyPx + 30}
          >
            <Stack direction="column">
              <Typography component="h1" variant="h1"
                sx={{ fontFamily: "Ibarra Real Nova", color: theme.palette.common.light, ml: 2 }}
              >Wedding, Inspired by Love
              </Typography>
            </Stack>
          </WeddingMsg>
          <Banner
            bg={theme.palette.common.blueFade}
            transY={weddingTreePx * 1}
            transZ={-weddingTreePx}
            color={theme.palette.common.orangeFade2}
            sx={{ fontFamily: "Ibarra Real Nova" }}
          >
            <Container maxWidth={"sm"} sx={{ margin: "2rem auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <Stack direction={"column"} sx={{ margin: "auto" }}>
                <Typography component="h1" variant="h2" sx={{ fontFamily: "Ibarra Real Nova" }}>
                  Like A Flower(<SpaIcon sx={{ ml: 1, fontSize: "50px", color: "blue)grey" }} />),
                </Typography>
                <Typography component="h1" variant="h4" sx={{ fontFamily: "Ibarra Real Nova" }}>
                  Love Is A Rush Of Fragmented Colors Entering My momentary Thoughts,
                </Typography>
                <Typography component="h1" variant="h5" sx={{ fontFamily: "Ibarra Real Nova" }}>
                  When I'm With You,,,---<FavoriteIcon sx={{ ml: 1, color: "pink" }} />
                </Typography>
              </Stack>

              <Stack direction="column" sx={{ maxWidth: "350px", mt: 2 }}>
                <Typography component="h1" variant="body1">
                  This, and all content can be editable, through an editor, with font changes, if desired.
                </Typography>
              </Stack>
              <Stack direction="column" sx={{ mt: 2 }}>
                <Fab variant="extended" sx={{ background: theme.palette.common.orangeFade, '&:hover': { background: "white" } }}>Learn More</Fab>

              </Stack>

            </Container>
          </Banner>


        </MainContainer>
        <MainContainer2>
          <Grid container spacing={0}
            sx={{ margin: "2rem auto", marginTop: { xl: "3rem" } }}
          >
            <Grid item xs={12} md={6} sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Card>
                <CardMedia ref={flowerRef} image={flower} className={flowerSeen ? Styles.flowerSeen : Styles.flowerNotSeen} component="img" alt="www.master-connect.ca" />
                <CardContent>
                  <Typography component="h1" variant="h6" sx={{ fontFamily: "Ibarra Real Nova" }}>Our Event</Typography>
                  <Typography component="h1" variant="h4" sx={{ fontFamily: "Ibarra Real Nova" }}>Designed By Unity,</Typography>
                  <Typography component="h1" variant="h5" sx={{ fontFamily: "Ibarra Real Nova" }}>Created For You</Typography>
                </CardContent>
              </Card>

            </Grid>
            <Grid item xs={12} md={6} className={Styles.scrollGridFrame} sx={{ minHeight: "26vh" }} >
              <CustImg ref={weddingTableRef} src={weddingTable} alt="www.master-connect.ca" className={weddingTableSeen ? Styles.weddingTable : Styles.notWeddingTable}
                style={{ display: activateWeddingTable }}
              />
            </Grid>

          </Grid>
          <Contribute/>
        </MainContainer2>
      </>
      <Container maxWidth="md">
        <Stack direction="column" sx={{ margin: "1rem auto" }}>
          {showPurchaseBtn ? <UserSignedInPurchaseBtn />
            :
            <ModalContainer />}
        </Stack>
      </Container>
    </MainWeddingContainer>
  )
}

export default Design6Wedding