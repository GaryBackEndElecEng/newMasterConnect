import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./services.module.css";
import styled from "styled-components";
import { Typography, Container, Grid, Box, CardMedia } from "@mui/material";
import api from "../axios/api";
import FaqItem from './FaqItem';

const CustFAQS = styled.div`
  margin: 1rem;
  width:100%;
  opacity: ${({ opacity }) => opacity};
  padding: 0.5rem 1rem;
//   min-height: 50dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: inherit;
//   border:1px solid red;

  animation: ${({ animation }) => animation} ;
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(50%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @keyframes slideDown {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @media screen and (max-width: 900px) {
    margin: 1rem 0.15rem;
  }
  @media screen and (max-width: 600px) {
    margin: 1rem 0.1rem;
  }
`;
const CusCheetaImg=styled.div`
margin:auto 0;
/* padding:0.5rem; */
width:100%;
height:100%;
background-size:120% 120%;
background-position:50% 50%;
background-image:url(${({bgimage})=>bgimage}),url(${({bgimage2})=>bgimage2});
background-blend-mode:multiply;
// cross-fade(url(${({bgimage})=>bgimage}),url(${({bgimage2})=>bgimage2}),25%);
animation: ${({animation})=>animation};

@keyframes growOut {
from {background-size:160% 160%;};
from {background-size:120% 120%;};
}
@media screen and (max-width:900px){
    background-position:50% 50%;
    background-size:150% 120%;

    @keyframes growOut {
from {background-size:190% 160%;};
from {background-size:150% 120%;};
}
}
@media screen and (max-width:900px){
    background-position:50% 50%;
    background-size:200% 120%;

@keyframes growOut {
from {background-size:260% 160%;};
from {background-size:200% 120%;};
}
}
`;

const FAQS = ({getWidth}) => {
  const faqRef = React.useRef(null);
  const { staticImage } = React.useContext(GeneralContext);
  const [getFAQS, setGetFAQS] = React.useState({ loaded: false, data: [] });
  const [openFaqs, setOpenFaqs] = React.useState(false);
  const cheetaFramed = `${staticImage}/cheetaFramed.png`;
  const FAQS=`${staticImage}/FAQS.png`;
  const threshold=getWidth < 900 ? (getWidth < 600 ? 0.1 : 0.5) : 0.5;

  React.useEffect(() => {
    const getfaqs = async () => {
      try {
        const res = await api.get("/FAQS/");
        const faqs = res.data;
        setGetFAQS({ loaded: true, data: faqs });
      } catch (error) {
        console.error(error.message);
      }
    };
    getfaqs();
  }, []);
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let entry = entries[0];
        if (entry.isIntersecting) {
          setOpenFaqs(true);
        }
      },
      { threshold: threshold }
    );
    if (faqRef.current) {
      observer.observe(faqRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <CustFAQS 
    opacity={openFaqs || getWidth < 900 ? "1":"0"}
    animation={openFaqs || getWidth <900 ? "slideUp 1.5s ease-out" : "slideDown 1.5s ease-in"}
    ref={faqRef}
    >
      <div className={styles.hr_line}  />
      
        <Typography component="h1" variant="h1" sx={{textAlign:"center"}}>FAQS</Typography>
        <Grid container spacing={{xs:0,sm:2}}  sx={{justifyContent:"center",maxHeight:{sm:"120dvh"},margin:"auto 0"}}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ height: { xs: "50vh",sm:"60vh", md: "50vh" }, position: "relative",}}
            className={styles.QAGridPic}
          >
            <CusCheetaImg
              bgimage={cheetaFramed}
              bgimage2={FAQS}
              animation={openFaqs ? "growOut 1.5s ease-in-out":""}
            ></CusCheetaImg>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{height: { xs: "80vh", md: "50vh" }, }}
            className={styles.QAgrid}
          >
            <div>
            {getFAQS.loaded ? (
              getFAQS.data
                .map((obj, index) => (
                  <div key={`${obj.id}--FAQ--${index}`} className={styles.scrollChild}>
                    <FaqItem obj={obj} getWidth={getWidth}/>
                  </div>
                ))
                .sort((a, b) => a.id < b.id)
            ) : (
              <div>
                <h5>loading...</h5>
              </div>
            )}
            </div>
          </Grid>
        </Grid>
    
      <div className={styles.hr_line} />
    </CustFAQS>
  );
};

export default FAQS;
