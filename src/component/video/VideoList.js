import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./video.module.css";
import { Stack, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import api from '../axios/api';
import CardItem from "./CardItem";

const CustVideoList =styled.section`
margin:0 auto;
padding:1rem;
display:flex;
flex-direction:column;
align-items:flex-start;
justify-content:center;
opacity:1;
background:var(--background-videoList);

`;


const VideoList = ({getWidth}) => {
    const vidlistRef=React.useRef(null);
    const {staticImage2}=React.useContext(GeneralContext);
    const [turnon,setTurnon]=React.useState(false);
    const [videolist,setVideolist]=React.useState({loaded:false,data:[]});

    React.useEffect(()=>{
        const getVideos= async()=>{
            try {
                const res = await api.get('/account/product/');
                const products = res.data;
                const videos=products.filter(obj=>(obj.type==="video"));
                setVideolist({loaded:true,data:videos.sort((a,b)=>(a.id < b.id))});
            } catch (error) {
            console.error(error.message);
            }
        }
        getVideos();
    },[]);

    React.useEffect(()=>{
        const observer= new IntersectionObserver(entries=>{
            let entry=entries[0];
            if(entry.isIntersecting){
                setTurnon(true);
            }
        },{threshold:0.1});
        if(vidlistRef.current){
            observer.observe(vidlistRef.current);
            return ()=>observer.disconnect();
        }
    },[]);
  return (
    <CustVideoList   >
        <Grid container spacing={2} >
            { videolist.loaded ? videolist.data.map((obj,index)=>(
                <Grid item xs={12} md={6}
                key={`${obj.id}--video-item-${index}`}
                id={`${obj.id}--video-item-${index}`}
                >
                    <CardItem obj={obj} getWidth={getWidth}/>
                </Grid>
            ))
            :
            <div><h5>loading...</h5></div>
            }
        </Grid>

    </CustVideoList>
  )
}

export default VideoList