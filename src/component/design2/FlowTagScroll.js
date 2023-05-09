import React from "react";
// import styled from "styled-components";
import {Link} from 'react-router-dom';
import { Grid, Typography,} from "@mui/material";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./design2.module.css";
import TagItem from './TagItem';

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
                        This allows an amazing display of flower types and provides a fluid ease of search for the client.  
                    </Typography>
                    <Typography component="h1" variant="ul" sx={{margin:"1rem auto"}}>Perennials
                    <Typography component="li" variant="h6">
                    <span style={{color:"blue"}}>shade</span>:We can customize your site to your desire.  
                    </Typography>
                    <Typography component="li" variant="h6">
                        <span style={{color:"blue"}}>un-shade</span>:You need to build up your clientele and improve on Internet search results?-<Link to="/contact" ><span style={{fontWeight:"bold"}}>CALL US!   </span></Link>
                    </Typography>
                    </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
            <div className={styles.scrollparent}>
                {flowerTags.loaded ? flowerTags.data.map((obj,index)=>(
                    <div key={`${obj.id}--flowerTag--${index}`}
                    className={styles.scrollChild}>
                        <TagItem obj={obj} />
                        </div>
                ))
            :
            <div><h5>loading...</h5></div>
            }

            </div>
            </Grid>
            </Grid>
        
    </div>
  )
}

export default FlowTagScroll