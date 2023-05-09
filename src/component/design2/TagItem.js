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
background-size:100% ${({selected})=>selected ? "200" : "100"}%;
padding-bottom:1rem;
margin-bottom:5vh;
animation:${({selected})=>selected ? "animate":"closeAnimate"} 2s linear;
@keyframes animate {
    from{background-size:100% 100%;}
    to{background-size:100% 200%;}
}
@keyframes closeAnimate {
    from{background-size:100% 200%;}
    to{background-size:100% 100%;}
}

`;

const TagItem = ({obj}) => {
    const tagRef=React.useRef(null);
    const [selected,setSelected]=React.useState(false);

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
        selected={selected}
        >
        
        <CardContent>
            <Typography component="h1" variant="h4" sx={{margin:"2rem auto"}}>{obj.name}</Typography>
        </CardContent>
        </CustCard>
    </div>
  )
}

export default TagItem