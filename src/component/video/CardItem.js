import React from 'react'
import { Typography,Card,CardMedia,CardContent} from '@mui/material';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styled from 'styled-components';
import styles from './video.module.css';
import VideoOpen from './VideoOpen';


const CustCard=styled(Card)`
margin:0;
position:relative;
padding:0.5rem;
display:flex;
width:100%;
flex-direction:column;
justify-content:center;
align-items:center;
gap:10px;
background:var(--background-color-video);
@media screen and (max-width:900px){
    width:95vw;
}
@media screen and (max-width:600px){
    width:90vw;
    gap:5px;
}
`;


const CardItem = ({getWidth,obj}) => {
    const vidlistRef=React.useRef(null);
    const {staticImage,openvideo,setOpenvideo}=React.useContext(GeneralContext);
    const [turnon,setTurnon]=React.useState(false);

    React.useEffect(()=>{
        const observer= new IntersectionObserver(entries=>{
            let entry=entries[0];
                setTurnon(entry.isIntersecting);
        },{threshold:0.1});
        if(vidlistRef.current){
            observer.observe(vidlistRef.current);
            return ()=>observer.disconnect();
        }
    },[]);

        const handleClickVideo=(e,obj)=>{
            e.preventDefault();
            if( !openvideo.loaded  ){
                setOpenvideo({loaded:true,id:obj.id});
            
            }else{
                setOpenvideo({loaded:false,id:null});
        }
        };

        const handleClose=(e)=>{
            e.preventDefault();
            setOpenvideo({loaded:false,id:null});
        }

  return (
    <CustCard
    className={styles.custcard}
    sx={{background:"var(--background-color-video)",height:{md:"100vh"}}}
    >
        <Typography component="h1" variant={window.innerWidth <600 ? "h5":"h3"} ref={vidlistRef}
        className={turnon ? styles.videoNameON : styles.videoNameOff}
        >
            {obj.name}
        </Typography>
        <CardMedia component="img"
         src={`${staticImage}/${obj.frontCover}`}
         alt="www.masterconnect.ca"
        height={"60%"}
        onClick={(e)=>handleClickVideo(e,obj)}
        />
        <CardContent onMouseOut={(e)=>handleClose(e)}>
            <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>Summary</Typography>
            <Typography component="h1" variant="h6">{obj.summary}</Typography>
            <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>Description</Typography>
            <Typography component="h1" variant="body1">{obj.desc}</Typography>
        </CardContent>
        { openvideo.loaded && openvideo.id===obj.id && 
        <VideoOpen src={`${staticImage}/${obj.imageName}`} getWidth={getWidth}/>
}
    </CustCard>
  )
}

export default CardItem