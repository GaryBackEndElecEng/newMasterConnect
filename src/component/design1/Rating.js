import React from 'react';
import { Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { GeneralContext } from "../../context/GeneralContextProvider.js";
import styled from "styled-components";
import styles from "./design1.module.css";
import Star from './Star.js';

const Rating = ({ obj }) => {
    const cardRef=React.useRef();
    const [star,setStar]=React.useState(null);

    React.useEffect(()=>{
        const observer=new IntersectionObserver((entries)=>{
            let entry=entries[0];
            if(entry.isIntersecting){
                // console.log("intersectionRect",entry.intersectionRect,"intersectionRatio",entry.intersectionRatio);
                entry.target.style.background="none";
                entry.target.style.opacity="1";
                entry.target.style.transform="scale(1.05)";
                entry.target.style.transition="all 0.25s ease-in-out";
            }else{
                entry.target.style.background="rgba(0,0,0,0.3)";
                entry.target.style.opacity="0.1";
                entry.target.style.transform="scale(1)";
                entry.target.style.transition="all 0.25s ease-in-out";
            }
        },{threshold:0.5});
        observer.observe(cardRef.current);
        //----------------------
        
    },[]);

    React.useEffect(()=>{

    },[]);

  return (
    <Card
      elevation={3}
      className={styles.ratingcard}
      ref={cardRef}
      
    >
      <Typography component="h1" variant="h5" sx={{color:"white"}}>
        {obj.name}
      </Typography>
      <Star star={obj.rating}/>
      <CardContent>
        <Typography component="h1" variant="h6" sx={{color:"white"}}>
          {obj.comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Rating;
