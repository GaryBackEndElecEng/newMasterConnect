import React from "react";
import styles from "./about.module.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Stack, Typography, IconButton, Grid, Container } from "@mui/material";
import ScrollerDataContent from './ScrollerDataContent';
import SocialMedia from './SocialMedia';
import GeneralContact from './GeneralContact';

const Scroller = ({ contactInfo }) => {
  const navigate = useNavigate();
  const [sixHundred, setSixHundred] = React.useState(false);
  const [h3h4, setH3h4] = React.useState("h3");
  const [generalInfo,setGeneralInfo]=React.useState({loaded:false,data:null});

  React.useEffect(()=>{
    if(contactInfo.loaded && contactInfo.data){
    setGeneralInfo(
      {loaded:true, data:[
        {id:1,name:contactInfo.data.name,value:contactInfo.data.cell,type:"tel",content:"Call Us"},
        {id:2,name:"email",value:"masterconnect919@gmail.com",type:"mailto",content:"email Us"},
        {id:3,name:"media",value:contactInfo.data.siteArray,type:"media",content:"Visit Us"},
      ]
      })
    }
    
  },[contactInfo.loaded,contactInfo.data]);


  React.useEffect(() => {
    if (window.innerWidth && window.innerWidth < 600) {
      setSixHundred(true);
      setH3h4("h4");
    }
  }, []);
  const handleRequest = (e) => {
    e.preventDefault();
    navigate("/start-project");
  };
  return (
    <div style={{margin:0,padding:0}}>
    <div className={styles.mainScroller}>
      <div className={styles.scrollerParent}>
        <div className={styles.scroller}>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
        </div>
      </div>
      <Stack direction="column" spacing={2} className={styles.startProject}>
        <div onClick={(e) => handleRequest(e)}>
          <Typography component="h1" variant={h3h4}>
            Start a Project
          </Typography>
          <IconButton>
            <ArrowForwardIcon sx={{ ml: 3 }}  />
          </IconButton>
        </div>
      </Stack>
      <div className={styles.scrollerParent}>
        <div className={styles.scroller2}>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
          <p>MASTERCONNECT.CA- </p>
        </div>
      </div>
      
    </div>
    <div className={styles.contactInfo}>
        <div style={{ margin: "auto" }}>
                      
            <Typography
              component="h1"
              variant="h4"
              sx={{ margin: "1rem auto" }}
              className={styles.infoFontStyle}
            >
              CHAT WITH US
            </Typography>
            <div className={styles.flexContact}>
              <GeneralContact ContactInfo={contactInfo}/>
              <SocialMedia contactInfo={contactInfo}/>
            </div>
              
        </div>
      </div>
    </div>
  );
};

export default Scroller;
