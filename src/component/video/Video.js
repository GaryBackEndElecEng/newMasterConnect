import React from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
// import styles from './video.module.css';
// import {Stack,Grid,Typography} from '@mui/material';
import styled from 'styled-components';
import CoverPage from './CoverPage';
import VideoList from './VideoList';
import VideoBanner from "./VideoBanner";
import VideoHelmet from './VideoHelmet';


const CustMainVideo=styled.div`
margin:0 auto;
display:flex;
justify-content:flex-start;
align-items:flex-start;
flex-direction:column;
animation:slideLeft 1.5s ease-in-out;
@keyframes slideLeft {
  from {opacity:0;transform:translateX(-100%);}
  to {opacity:1;transform:translateX(0%);}
}
`;


const Video = () => {
    const {generalInfo}=React.useContext(GeneralContext);
    const [getWidth,setGetWidth]=React.useState(null);

    React.useEffect(()=>{
      setGetWidth(window.innerWidth);
      if(window.scrollY){
        window.scroll(0,0);
      }
    },[]);

  return (
    <CustMainVideo>
<VideoHelmet generalInfo={generalInfo.loaded ? generalInfo.data : null}/>
    <CoverPage getWidth={getWidth}/>
    <VideoBanner getWidth={getWidth}/>
    <VideoList getWidth={getWidth}/>
    </CustMainVideo>
  )
}

export default Video