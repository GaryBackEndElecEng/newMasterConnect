import React from "react";
// import { GeneralContext } from "../../context/GeneralContextProvider";
import styled from "styled-components";
import { Stack, Typography, Grid, } from "@mui/material";
import styles from "./services.module.css";
import BrushIcon from '@mui/icons-material/Brush';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import StorefrontIcon from '@mui/icons-material/Storefront';
import WebIcon from '@mui/icons-material/Web';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EngineeringIcon from '@mui/icons-material/Engineering';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const icons_=[
    {id:1,name:"Visual Design",icon:< BrushIcon sx={{mr:2,fontSize:{sm:"30px",md:"40px"}}}/>},
    {id:2,name:"Development",icon:< DeveloperBoardIcon sx={{mr:2,fontSize:{sm:"30px",md:"40px"}}}/>},
    {id:3,name:"CMS Design & Impl.",icon:< ManageAccountsIcon sx={{mr:2,fontSize:{sm:"30px",md:"40px"}}}/>},
    {id:4,name:"Ecommerce",icon:< StorefrontIcon sx={{mr:2,fontSize:{sm:"30px",md:"40px"}}}/>},
    {id:5,name:"Campaign Microsites",icon:< WebIcon sx={{mr:2,fontSize:{sm:"30px",md:"40px"}}}/>},
    {id:6,name:"Website Redesign Serv(s)",icon:< DesignServicesIcon sx={{mr:2,fontSize:{sm:"30px",md:"40px"}}}/>},
    {id:7,name:"Maintenance Serv(s)",icon:< EngineeringIcon sx={{mr:2,fontSize:{sm:"30px",md:"40px"}}}/>},
    {id:8,name:"Maintenance Serv(s)",icon:< QueryStatsIcon sx={{mr:2,fontSize:{sm:"30px",md:"40px"}}}/>},
]

const CustGrid=styled(Grid)`
justify-content:center;
align-items:center;
margin:0;
padding-inline:1rem;
padding-block:0;

opacity:${({opacity})=>opacity };
transform: translateY(${({transformy})=>transformy});
transition: all 1s ease-in-out;
@media screen and (max-width:900px){
    // margin:auto 0.5rem;
    // margin-left:0px;
    
}
@media screen and (max-width:600px){
    margin:auto 16px;
    margin-left:0px;
    
}
`;
const CustTypo=styled(Typography)`
background-clip:text !important;
-webkit-background-clip:text !important;
-webkit-text-stroke:1px ${({strokecolor})=>strokecolor} !important;
background-image:${({backgroundimage})=>backgroundimage};
background-size:${({backgroundsize})=>backgroundsize};
background-position:50% 50%;
color:transparent;
transition:all 1.75s ease-in;
`;
const MoreTypo=styled(Typography)`
opacity:1;
display:${({display})=>display};
animation:scaleThis 1.5s ease-in-out;
@keyframes scaleThis {
from {transform:scaleY(0) ;opacity:1;}
to {transform:scaleY(1);opacity:1;}
}
@media screen and (max-width:900px){
  
}
@media screen and (max-width:600px){
  
}
`;

const ServiceItem = ({obj}) => {
    const [fontSize,setFontSize]=React.useState(null);
    const servRef=React.useRef();
    const [show,setShow]=React.useState(null);
    const [show1,setShow1]=React.useState(null);
    const [newObj,setNewObj]=React.useState({});
    const [fullSentence,setFullSentence]=React.useState(null);
    const [isMore,setIsMore]=React.useState(null);
  const threshold= window.innerWidth < 600 ? 0.5 : 1;
  const iconColor= show1 ? {color:"blue",transition:"color 1.5s ease-in"} :{color:"red",transition:"color 1.5s ease-in"}
    
const getFirst=React.useCallback(()=>{
  let paraArr=obj.desc.split(".")
  let para=paraArr[0]
  
  return para
},[obj]);


    React.useEffect(()=>{
        icons_.forEach(ob=>{
            if(obj.id===ob.id){
                let aa={id:obj.id,name:obj.name,desc:obj.desc,icon:ob.icon}
              setNewObj(aa)
            }
        });
    },[]);

    React.useEffect(()=>{
        if(window.innerWidth<900){
            setFontSize("h4");
        }if(window.innerWidth<600){
            setFontSize("h4");

        }else{
            setFontSize("h3");

        }
    },[]);

    React.useEffect(()=>{
        const observer=new IntersectionObserver((entries)=>{
            let entry=entries[0];
            setShow1(entry.isIntersecting)
            if(entry.isIntersecting){
                setShow(true);
            }
        },{threshold:threshold});
        if(servRef.current){
            observer.observe(servRef.current);
            // return ()=>observer.disconnect();
        }
    },[]);

    const handleDesc=()=>{
      setFullSentence(true);
    }

  return (
    <CustGrid
    
    opacity={show ? "1": "0"}
    transformy={show ?  "0%":"20%"}
    ref={servRef}
      container
      spacing={0}
      
    >
      <div className={styles.hr_line} />
      <Grid item xs={12} md={6}>
        <Stack
          direction="column"
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
            <Stack direction="row" sx={{flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
           <span style={iconColor}> {newObj.icon}</span>
          <CustTypo component="h1" variant={fontSize} 
          backgroundsize={show1 ? "50% 100%":"150% 200%"}
          backgroundimage={show1 ? "var(--background-service)" : "var(--background-service1)"}
          strokecolor={show1 ? "white":"blue"}
          >
            {newObj.name}
          </CustTypo>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
      
        <Typography component="h1" variant="h6" 
        sx={{paddingLeft:{sm:"10px",md:"auto",xs:"5px"},paddingRight:{sm:"10px",md:"auto",xs:"5px"}}}
        className={!fullSentence ? styles.showSentence : styles.hideSentence}
        >
          {getFirst()}....
          <span
          onClick={()=>handleDesc()}
          style={{color:"blue",fontSize:"26px",textDecoration:"underline",cursor:"pointer"}}
          >
            more
          </span>
        </Typography>
        
        <MoreTypo
        display={fullSentence ? "block":"none"}
         component="h1"
         variant="h6"
         sx={{paddingLeft:{sm:"10px",md:"auto",xs:"5px"},paddingRight:{sm:"10px",md:"auto",xs:"5px"}}}
        >
          {newObj.desc}
        </MoreTypo>
      
      </Grid>
      
    </CustGrid>
  );
};

export default ServiceItem;
