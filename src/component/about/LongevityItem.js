import React from "react";
import styles from "./about.module.css";
import styled from "styled-components";

import { Stack, Typography, Grid, Container,fontSize } from "@mui/material";

const LongevityItem = ({ obj }) => {
  const MyRef = React.useRef(null);
  const [showPic, setShowPic] = React.useState({ loaded: false, id: null });
  const [effect, setEffect] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setEffect(true);
          if(window.innerWidth && window.innerWidth >600){
          entries[0].target.classList.add(styles.intersectingElevate);
          }
          
          
         
        }else{
          
          if(window.innerWidth && window.innerWidth >600){
          entries[0].target.classList.remove(styles.intersectingElevate);
          }
          
        }
      },
      { threshold: 1 }
    );
    observer.observe(MyRef.current);
  }, []);

  const handleShowImg = (e, obj) => {
    e.preventDefault();
    setShowPic({ loaded: true, id: obj.id });
    if (window.innerWidth < 900) {
      setTimeout(() => {
        setShowPic({ loaded: false, id: null });
        setEffect(false);
      }, 8000);
    }
  };
  return (
    <Grid
      container
      className={effect ? styles.longevityShow : styles.longevity}
      onMouseOver={(e) => handleShowImg(e, obj)}
      ref={MyRef}
    >
      <Grid item xs={12} sm={12} md={6}>
        <Typography component="h1" variant={window.innerWidth < 600 ? "h3":"h2"} className={styles.fontEffectTitle}>
          {obj.name}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Typography component="h1" variant="h6">
          {obj.content}
        </Typography>
      </Grid>
      {showPic.loaded && showPic.id === obj.id && (
        <img
          src={obj.image}
          alt="www.masterconnect.ca"
          className={styles.longevityPicHover}
          style={{ width: "300px", height: "250px" }}
        />
      )}
    </Grid>
  );
};

export default LongevityItem;
