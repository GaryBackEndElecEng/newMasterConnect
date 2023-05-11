import React from 'react';
import {useNavigate} from 'react-router-dom';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from './video.module.css';
import {Fab, Stack, Typography} from '@mui/material';
import styled from 'styled-components';
import WordEffect from './WordEffect';

const CustSectionBanner=styled.section`
width:100vw;
margin:0;
margin-top:-10px;
z-index:20;
min-height:40vh;
display:flex;
justify-content:space-around;
align-items:center;
flex-wrap:wrap;
opacity:${({opacity})=>opacity};
transform:translateY(${({transformy})=>transformy});
transition:all 1.5s ease-in-out;
background:var(--background-video-banner);
@media screen and (max-width:900px){
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    min-height:0;
    height:auto;
}
@media screen and (max-width:600px){
    flex-direction:column;
}

`;
const CustWordWrapper=styled.div`
margin:0 1px;
display:flex;
flex-direction:row;
justify-content:flex-start;
align-items:center;
@media screen and (max-width:600px){
    flex-direction:column;
}
`;

const VideoBanner = ({getWidth}) => {
    const navigate=useNavigate();
    const blockRef=React.useRef();
    const {staticImage}=React.useContext(GeneralContext);
    const [block,setBlock]=React.useState(false);
    const swirl=`${staticImage}/extra/swirls.png`;
    const set_text= getWidth < 900 ? (getWidth <600 ? "h4":"h3"):"h2";
    const setThreshold=getWidth<900 ? (getWidth <600 ? 0.1 :0.3):0.7;
   

    React.useEffect(()=>{
        const observer=new IntersectionObserver(entries=>{
            let entry=entries[0];
            if(entry.isIntersecting){
                setBlock(true);
            }
        },{threshold:setThreshold});
        if(blockRef.current){
            observer.observe(blockRef.current);
            return ()=>observer.disconnect();
        }
    },[]);
    const handleContact=(e)=>{
        e.preventDefault();
        navigate("/contact");
    }

  return (
    <CustSectionBanner
    className={styles.custSectionBanner}
    ref={blockRef}
    opacity={block ? "1":"0"}
    transformy={block ? "0%":"40%"}
    >
        <div>
            <CustWordWrapper>
             <WordEffect word={"Create"}/>
             <WordEffect word={"your"}/>
             <WordEffect word={"own"}/>
             <WordEffect word={"video"}/> 
             </CustWordWrapper>
            
            <Typography component={"h1"} variant={set_text}>
            Do you have an idea? - let us know.
            </Typography>
            <Stack direction="column" sx={{margin:"1rem auto"}}>
                <Fab size="large" variant="extended" color="secondary" onClick={(e)=>handleContact(e)} >
                    request
                </Fab>
            </Stack>
          </div>
        <div>
        <CustWordWrapper>
        <WordEffect word={"make"}/>
        <WordEffect word={" a "}/>
        <WordEffect word={"request"}/>
        </CustWordWrapper>
        <Typography component={"h1"} variant={set_text}>
            Ask Us what you would like and we will see if we can do it for you.
            </Typography>
            <Stack direction="column" sx={{margin:"1rem auto"}}>
                <Fab size="large" variant="extended" color="secondary" onClick={(e)=>handleContact(e)} >
                    ask us
                </Fab>
            </Stack>
        </div>
    </CustSectionBanner>
  )
}

export default VideoBanner