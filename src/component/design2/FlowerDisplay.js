import React from "react";
// import styled from "styled-components";
import FlowerItem from './FlowerItem';
import {Typography,} from "@mui/material";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./design2.module.css";

const FlowerDisplay = () => {
  const flowerRef=React.useRef(null);
    const { staticImage } = React.useContext(GeneralContext);
    const [flowers,setFlowers]=React.useState({loaded:false,data:[]});
    const [selected,setSelected]=React.useState(false);

    React.useEffect(()=>{
        const genArray=()=>{
        let arr=[];
        for(let i=0;i<20;i++){
            arr.push({id:i+1,image:`${staticImage}/design2/flower${i+1}.JPG`,name:`name label-${i+1}`,rating:5})
        }
        setFlowers({loaded:true,data:arr});
        }
        genArray();
    },[]);
    
  // const [selected,setSelected]=React.useState(false);

  React.useEffect(()=>{
    if(!flowerRef.current) return;
    const observer=new IntersectionObserver((entries)=>{
        let entry=entries[0];
        if(entry.isIntersecting){
        setSelected(true);
        }else{
          setTimeout(()=>{setSelected(false);},0)
        }
        
    },{threshold:0.5});
    observer.observe(flowerRef.current);
    return()=>{
        observer.disconnect();
    }
    
},[]);
const handleSelected=(e,obj)=>{
    if(!selected){
      setSelected(true);
    }else{
      setSelected(false);
     

    }
}

  return (
    <div className={styles.mainFlower} ref={flowerRef}
    onMouseOut={()=>setSelected(true)}
    >
        <Typography component="h1" variant="h3" sx={{position:"absolute",top:"2%"}}>Seasonal flowers</Typography>
        <div className={styles.scrollFlowerParent}>
            {flowers.loaded ? flowers.data.map((obj,index)=>(
                <div key={`${obj.id}--flowerItem--${index}`}
                className={selected ? styles.scrollFlowerChild : styles.noScrollFlowerChild}
                onMouseOver={()=>setSelected(false)}
                onClick={(e)=>handleSelected(e,obj)}
                >
                    <FlowerItem obj={obj} />
                    </div>
            ))
            
            :
            <div><h5>loading...</h5></div>
        }
        </div>
    </div>
  )
}

export default FlowerDisplay