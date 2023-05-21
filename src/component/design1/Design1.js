import React from "react";
import { useLocation } from "react-router-dom";
import { Typography, Container, Grid, Stack,  } from "@mui/material";
import { GeneralContext } from "../../context/GeneralContextProvider.js";
import Design1Helmet from './Design1Helmet';
import styled from "styled-components";
import styles from "./design1.module.css";
import introArr from "./intro";
import IntroPage from "./IntroPage";
import Rental from "./Rental";
import Review from './Review';
import CoverPage from './CoverPage';
import ratings from './ratingArray.json';
import Calendar from './Calendar';

const CustomDesign1 = styled.div`
  margin: 0;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  place-items: center;
  background:var(--background-design1);
  animation: clearIn 2s ease-in-out;
  @keyframes clearIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media screen and (max-width: 900px) {
    // margin-top:-2px;
  }
  @media screen and (max-width: 600px) {
    // margin-top:-54px;
  }
`;

const Design1 = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { productDesigns, pageRatings, staticImage,staticImage2,open, setOpen,setCssSet,generalInfo }=React.useContext(GeneralContext);
  const image1 =
    "https://master-connect.s3.ca-central-1.amazonaws.com/static/pics/shortTermRental2.png";

  const [intro, setIntro] = React.useState({ loaded: false, data: [] });
  const [countOut, setCountOut] = React.useState(null);
  const [one, setOne] = React.useState({ loaded: false, data: {} });
  const [rating, setRating] = React.useState({ loaded: false, data: {} });
  const [play, setPlay] = React.useState(false);
  const [Ratings,setRatings]=React.useState({loaded:false,data:[]});
  const [productDesign,setProductDesign]=React.useState({loaded:false,data:{}});
  const [pageRate,setPageRate]=React.useState({loaded:false,data:[]});
  

  React.useEffect(()=>{
    setRatings({loaded:true,data:ratings});
    if(productDesigns.loaded){
      setProductDesign({loaded:true,
      data:productDesigns.data.filter(obj=>(obj.extra_kwargs === "/design1"))[0]
      })
    }
    if(pageRatings.loaded){
      let pageArr=pageRatings.data.filter(obj=>(obj.page==='/design1'));
      setPageRate({loaded:true,data:pageArr});
    }
    
},[productDesigns.loaded,productDesigns.data,pageRatings.loaded,pageRatings.data]);


  React.useEffect(() => {
    //pageRatings.data.filter(obj=>(obj.page==="/design1"))
    if(window.scrollY){
      window.scroll(0,0);
    }
    setIntro({ loaded: true, data: introArr });
    if (pageRatings.loaded) {
      setRating({ loaded: true, data: pageRatings.data });
    }
  }, [pageRatings.loaded,pageRatings.data]);

  React.useEffect(() => {
    let count = 1;
    const getCount = () => {
      if (count >= 0 && intro.loaded && count < intro.data.length) {
        setOne({ loaded: true, data: intro.data[count] });
        count++;
        setPlay(true);
        setTimeout(() => {
          setPlay(false);
        }, 18000);
        setTimeout(() => {
          getCount();
        }, 20000);
      } else if (count === intro.data.length) {
        setPlay(true);
        setOne({ loaded: true, data: intro.data[intro.data.length - 1] });
      }
    };
    getCount();

  }, [intro.loaded,intro.data]);
  
  const handleClose=(e)=>{
    e.preventDefault();
    if(open ===true){
      setCssSet(styles.navMain);
      setOpen(false);
    }
  }
  
  return (
    <CustomDesign1>
      <Design1Helmet 
      generalInfo={generalInfo.loaded ? generalInfo.data :null}
        product={productDesign.loaded ? productDesign.data :null}
        pageRate={pageRate.loaded ? pageRate.data :null}
      />
      <CoverPage staticImage={staticImage}/>
      <Container maxWidth="xl"
      onMouseOut={(e)=>handleClose(e)}
      className={styles.customDesign1}
      >
        <section className={styles.coverPageReview} >
            <Review rating={Ratings}/>
            <Calendar staticImage={staticImage}/>
            <Review rating={rating}/>
        </section>
        <div className={styles.title}>
        <Typography component="h1" variant="h3" style={{marginBottom:"2rem"}}>Hot Spots</Typography>
        </div>
        <Stack direction="column"
          spacing={{ xs: 1, sm: 2, md: 8 }}
          className={styles.stackContainer}
        >
          
      
            <IntroPage
              one={one.loaded && one.data}
              play={play}
              staticImage={staticImage}
              image1={image1}
            />
      
        
            
        
        </Stack>
      </Container>
      <Rental />
    </CustomDesign1>
  );
};

export default Design1;
