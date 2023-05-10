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

const icons_=[
    {name:"Visual Design",icon:< BrushIcon sx={{mr:2,color:'red',fontSize:{sm:"30px",md:"40px"}}}/>},
    {name:"Development",icon:< DeveloperBoardIcon sx={{mr:2,color:'red',fontSize:{sm:"30px",md:"40px"}}}/>},
    {name:"CMS Design & Implementation",icon:< ManageAccountsIcon sx={{mr:2,color:'red',fontSize:{sm:"30px",md:"40px"}}}/>},
    {name:"Ecommerce",icon:< StorefrontIcon sx={{mr:2,color:'red',fontSize:{sm:"30px",md:"40px"}}}/>},
    {name:"Campaign Microsites",icon:< WebIcon sx={{mr:2,color:'red',fontSize:{sm:"30px",md:"40px"}}}/>},
    {name:"Website Redesign Services",icon:< DesignServicesIcon sx={{mr:2,color:'red',fontSize:{sm:"30px",md:"40px"}}}/>},
    {name:"Website maintenance Services",icon:< EngineeringIcon sx={{mr:2,color:'red',fontSize:{sm:"30px",md:"40px"}}}/>},
]

const CustGrid=styled(Grid)`
justify-content:center;
align-items:center;
margin:auto;

opacity:${({opacity})=>opacity };
transform: translateY(${({transformy})=>transformy});
transition: all 1s ease-in-out;
@media screen and (max-width:600px){
    margin:auto 16px;
    margin-left:0px;
    
}
`;
const ServiceItem = ({obj}) => {
    const [fontSize,setFontSize]=React.useState(null);
    const servRef=React.useRef();
    const [show,setShow]=React.useState(null);
    const [newObj,setNewObj]=React.useState({});

    

    React.useEffect(()=>{
        icons_.forEach(ob=>{
            if(obj.name===ob.name){
                let aa={id:obj.id,name:obj.name,desc:obj.desc,icon:ob.icon}
              setNewObj(aa)
            }
        });
    },[]);

    React.useEffect(()=>{
        if(window.innerWidth<900){
            setFontSize("h2");
        }if(window.innerWidth<600){
            setFontSize("h3");

        }else{
            setFontSize("h2");

        }
    },[]);
    React.useEffect(()=>{
        const observer=new IntersectionObserver((entries)=>{
            let entry=entries[0];
            if(entry.isIntersecting){
                setShow(true);
            }
        },{threshold:0.7});
        if(servRef.current){
            observer.observe(servRef.current);
            return ()=>observer.disconnect();
        }
    },[]);
  return (
    <CustGrid
    
    opacity={show ? "1": "0"}
    transformy={show ?  "0%":"50%"}
    ref={servRef}
      container
      spacing={0}
      
    >
      <div className={styles.hr_line} />
      <Grid item xs={12} md={7}>
        <Stack
          direction="column"
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
            <Stack direction="row" sx={{flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
            {newObj.icon}
          <Typography component="h1" variant={fontSize}>
            {newObj.name}
          </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={5}>
        <Typography component="h1" variant="h6" sx={{paddingLeft:{sm:"10px",md:"auto",xs:"5px"},paddingRight:{sm:"10px",md:"auto",xs:"5px"}}}>
          {newObj.desc}
        </Typography>
      </Grid>
    </CustGrid>
  );
};

export default ServiceItem;
