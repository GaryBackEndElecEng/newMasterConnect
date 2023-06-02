import React from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
// import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./design2.module.css";

const CustCard=styled(Card)`
margin:auto;
width:100%;
height:400px;
background-image:url(${({bgimage})=>bgimage});
filter:saturate(2);
background-position:50% 27%;
background-size:100% 200%;
padding-bottom:1rem;
margin-bottom:5vh;


`;

const TagItem = ({obj}) => {
    const tagRef=React.useRef(null);
    const [selected,setSelected]=React.useState(false);
    const not600 = window.innerWidth > 600 ? true :false;

    React.useEffect(()=>{
        if(!tagRef.current) return;
        const observer=new IntersectionObserver((entries)=>{
            let entry=entries[0];
            
            setSelected(entry.isIntersecting);
            
        },{threshold:0.8});
        observer.observe(tagRef.current);
        return()=>{
            observer.disconnect();
        }
        
    },[]);
   
  return (
    <div className={styles.tagItem}>
        <CustCard
        bgimage={obj.image}
        elevation={3} 
        ref={tagRef}
        >
        
        <CardContent>
            <Typography component="h1" variant="h4" sx={{margin:"2rem auto"}}>{obj.name}</Typography>
        </CardContent>
        </CustCard>
    </div>
  )
}

export default TagItem