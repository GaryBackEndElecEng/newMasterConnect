import React from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {useNavigate} from 'react-router-dom';
import styles from './home.module.css';
import styled from 'styled-components';
import {Typography,Container,Stack,Box,CardMedia,Card} from '@mui/material';

const CustVideoBlog = styled.section`
margin:0 auto;
width:100vw;
display:flex;
position:relative;
justify-content:space-around;
align-items:center;
flex-wrap:wrap;
min-height:40vh;
column-gap:20px;
z-index:100;
opacity:${({vidblogopen})=>vidblogopen ? "1":"0"};
background:var(--background-111);
animation:${({vidblogopen})=>vidblogopen ? "slideUp" :""} 1.5s ease-in-out;
@keyframes slideUp {
    from {transform:translateY(40%);}
    to {transform:translateY(0%);}
}
@media screen and (max-width:900px){
    column-gap:10px;
}
@media screen and (max-width:600px){
    row-gap:10px;
    flex-direction:column;
    justify-content:center;
}
`;
const CustVideo=styled(Card)`
margin:auto;
flex:0 0 33%;
cursor:pointer;
text-align:center;
background:transparent;
animation: ${({vidblogopen})=>vidblogopen ? "swirlUp" : ""} 20s linear infinite;
@keyframes swirlUp {
    0% {transform:translate(0%,0%) scaleX(1) scaleY(1);}
    25% {transform:translate(3%,0%) scaleX(0.9) scaleY(1);}
    50% {transform:translate(3%,3%) scaleX(0.9) scaleY(0.95);}
    75% {transform:translate(0%,3%) scaleX(1) scaleY(0.95);}
    100% {transform:translate(0%,0%) scaleX(1) scaleY(1);}
}
`;
const CustBlog=styled(Card)`
margin:auto;
flex:0 0 33%;
cursor:pointer;
text-align:center;
background:transparent;
animation: ${({vidblogopen})=>vidblogopen ? "swirlUp" : ""} 20s linear infinite reverse ;
@keyframes swirlUp {
    0% {transform:translate(0%,0%) scaleX(1) scaleY(1);}
    25% {transform:translate(3%,0%) scaleX(0.9) scaleY(1);}
    50% {transform:translate(3%,3%) scaleX(0.9) scaleY(0.95);}
    75% {transform:translate(0%,3%) scaleX(1) scaleY(0.95);}
    100% {transform:translate(0%,0%) scaleX(1) scaleY(1);}
}
`;


const VideoBlogs = () => {
    const navigate=useNavigate();
    const vidblogRef=React.useRef();
    const {staticImage}=React.useContext(GeneralContext);
    const video=`${staticImage}/extra/video.png`;
    const blog=`${staticImage}/extra/blog.png`;
    const [vidblogopen,setVidblogopen]=React.useState(false);

    React.useEffect(()=>{
        const observer=new IntersectionObserver(entries=>{
            let entry=entries[0];
            if(entry.isIntersecting){
                setVidblogopen(true);
            }
        },{threshold:0.7});
        if(vidblogRef.current){
            observer.observe(vidblogRef.current);
            return ()=>observer.disconnect();
        }
    },[]);

    const handleNavigate=(e,link)=>{
        e.preventDefault();
        navigate(link);
    }

  return (
    <CustVideoBlog 
    className={styles.custVideoBlog} 
    ref={vidblogRef}
    vidblogopen={vidblogopen}
    >
        <CustVideo elevation={3} vidblogopen={vidblogopen}  onClick={(e)=>handleNavigate(e,"/video")} className={styles.custVideo} style={{background:"transparent"}}>
            <Typography component="h1" variant="h3" className={styles.fontStyle} style={{color:"transparent"}}>videos</Typography>
            <CardMedia component="img" src={video} alt="www.masterconnect.ca"/>
        </CustVideo>

        <CustBlog elevation={3} vidblogopen={vidblogopen} onClick={(e)=>handleNavigate(e,"/blog")} className={styles.custBlog} style={{background:"transparent"}}>
            <Typography component="h1" variant="h3" className={styles.fontStyle} style={{color:"transparent"}}>blogs</Typography>
            <CardMedia component="img" src={blog} alt="www.masterconnect.ca"/>
        </CustBlog>
        
    </CustVideoBlog>
  )
}

export default VideoBlogs;