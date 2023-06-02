import React from "react";
// import styled from "styled-components";
import {Link} from 'react-router-dom';
import { Grid, Typography,} from "@mui/material";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./design2.module.css";
import TagItem from './TagItem';
import FlowerTagParent from './FlowerTagParent';

const FlowTagScroll = ({getWidth}) => {
    
    const { staticImage } = React.useContext(GeneralContext);
    const [flowerTags,setFlowerTags]=React.useState({loaded:false,data:[]});

    React.useEffect(()=>{
        const genArray=()=>{
        let arr=[];
        for(let i=0;i<18;i++){
            arr.push({id:i+1,image:`${staticImage}/design2/flowerTag${i+1}.JPG`,name:"AVAILABLE"})
        }
        setFlowerTags({loaded:true,data:arr});
        }
        genArray();
    },[]);
    
    


  return (
    <div className={styles.mainFlowerTag}>
            <Grid container  className={styles.mainGrid} spacing={0}>
                <Grid item xs={12} md={6} className={styles.sidebar}>
                    <div style={{margin:"auto 20px"}}>
                    <Typography component="h1" variant="h2" sx={{margin:"1rem auto"}}>Flower Type-<span style={{color:"red",fontSize:"63%"}}> in stock</span></Typography>
                    <Typography component="h1" variant="h6">
                        This allows the viewer to scroll through specific flower types.  
                    </Typography>
                    <Typography component="h1" variant="ul" sx={{margin:"1rem auto"}}>Perennials
                    <Typography component="li" variant="h6">
                    <span style={{color:"blue"}}>shade</span>:let us customize your site to maximize product displays.  
                    </Typography>
                    <Typography component="li" variant="h6">
                        <span style={{color:"blue"}}>un-shade</span>:give your viewers to priviledge to see your product displays!-<Link to="/contact" ><span style={{fontWeight:"bold"}}>CALL US!   </span></Link>
                    </Typography>
                    </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} sx={{position:"relative"}}>
            <FlowerTagParent flowerTags={flowerTags}/>
            </Grid>
            </Grid>
        
    </div>
  )
}

export default FlowTagScroll