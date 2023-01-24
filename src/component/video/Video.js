import React, { useContext, useEffect, useState,useRef } from 'react';
import {useLocation} from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import {TokenAccessContext} from '../../context/TokenAccessProvider';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Stack, Card, CardMedia, Typography, Box, Container, Grid, CardContent } from '@mui/material';
import VideoHelmet from './VideoHelmet';
import CoverPage from './CoverPage';
import styles from './video.module.css';
// import api from '../axios/api';
import RegisterPage from '../RegisterPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import PageRating from '../utils/PageRating';
import PageFeedback from '../utils/PageFeedback';
import { VerifiedOutlined } from '@mui/icons-material';


const CustDiv=styled.div`
margin:auto;
width:100vw;
position:relative;
background:whitesmoke;
animation: clearIn 2s ease-in-out;
@keyframes clearIn {
    from {opacity:0;}
    to {opacity:1;}
    }
@media screen and (max-width:900px){
    margin-top:0px;
}
@media screen and (max-width:800px){
margin-top:0px;
}
@media screen and (max-width:600px){
margin-top:0px;
}

`;

const Video = () => {
    const location=useLocation();
    const pathname=location.pathname;
    const coverRef=useRef();
    const [pageRatingHelmet,setPageRatingHelmet]=useState([]);
    const [keywords,setKeywords]=useState(null);
    const [desc,setDesc]=useState("");
    const [summary,setSummary]=useState("");

    const {staticImage,video,getPathLocation,average,pageRatings,setTitle,setStyleName}=useContext(GeneralContext);
    const staticImage2="https://new-master.s3.ca-central-1.amazonaws.com/static"
    const logoVideo=staticImage ? `${staticImage}/video/logoAdvert.mp4`:"";
    const image=`${staticImage}/video/videoImage.png`;
    const [getVideo,setGetVideo]=useState([]);
    useEffect(()=>{
        if(pageRatings.loaded && pageRatings.data){
            setPageRatingHelmet(pageRatings.data.filter(obj=>(obj.page===pathname)))
        }
       
        setSummary(" something here");
        
    },[pathname,pageRatings]);
    
    useEffect(()=>{
        setTitle("Videos");
        setStyleName("sample Videos");
        if(window.scrollY){
            window.scroll(0,0);
        }
        if(video.loaded){
            let arr=["video commercial","videos for sale"," somthing here"];
            let desc="";
        setGetVideo(video.data);
        video.data.forEach((obj,index)=>{
            arr.push(obj.name);
            desc = desc +  "," + index + ".)" + obj.desc + ",,," + obj.summary
        });
        setKeywords(arr);
        setSummary(desc);
        }
},[video.loaded])

    const handlePlayVideo=(e)=>{
        if(!e.currentTarget)return
        e.currentTarget.play();
    }
  return (
    <CustDiv>
        <GetRegisterPages/>
      <RegisterPage/>
      <VideoHelmet
      staticImage={staticImage}
      keywords={keywords}
      summary={summary}
      desc={desc}
      image={image}
      getVideo={getVideo ? getVideo:null}
      getPathLocation={getPathLocation.loaded ? getPathLocation.data:"https://www.masterconnect.ca"}
      average={average? average : "4"}
      />
        <CoverPage logoVideo={logoVideo} image={image}/>
        <Container maxWidth="xl">
<Grid container spacing={{xs:0,sm:1,md:2}}>

    {getVideo && getVideo.map((obj,index)=>(
        <Grid item xs={12} sm={6} md={4} key={`${obj.id}-video--${index}`}
        sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",position:"relative"}}
        >
            <Card elevation={10}
            sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",width:"100%"}}
            >
                <Typography compoent="h1" variant="h4">{obj.name}</Typography>
            <CardMedia
            sx={{margin:"auto",maxWidth:"600px",cursor:"pointer"}}
            component={"video"}
            type={"video/mp4"}
            autoPlay={true}
            playing={"true"}
            loop={false}
            poster={image}
            src={`${staticImage}/${obj.imageName}`}
            onClick={(e)=>handlePlayVideo(e)}
            height={"350px"}
            />
            <CardContent sx={{margin:"auto",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <Typography component="h1" variant="body1" sx={{margin:" auto"}}>{obj.summary}</Typography>
            <Typography component="h1" variant="body2" sx={{margin:"0.5rem auto"}}>{obj.desc}</Typography>
            <Stack direction="row" sx={{justifyContent:"center",alignItems:"center",margin:"auto"}}>
            <Typography component="h1" variant="h6" sx={{margin:"0.5rem auto"}}>5-year monthly: ${obj.monthly}.<sup>00</sup></Typography>
            <Typography component="h1" variant="h6" sx={{margin:"0.5rem auto"}}>savings: ${obj.monthly}.<sup>00</sup></Typography>
            </Stack>
            </CardContent>
            </Card>
        </Grid>
    ))}
</Grid>

        </Container>
        <Container maxWidth="md">
        <Typography component="h1" variant="h5" sx={{textAlign:"center",margin:"1rem auto"}}>Please comment on the design,below. We strive to improve.</Typography>
        <PageFeedback/>
        </Container>

    </CustDiv>
  )
}

export default Video