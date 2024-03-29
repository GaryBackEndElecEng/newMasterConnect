import React from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {useNavigate} from 'react-router-dom';
import styles from './home.module.css';
import styled from 'styled-components';
import {Typography,Stack,Fab,Box} from "@mui/material";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import BrushIcon from '@mui/icons-material/Brush';

const NewBanner1=styled.div.attrs({className:styles.banner1})`
position:relative;
opacity:${({opacity})=>opacity};
  min-height:45vh;
  background-image:url(${({bgimage})=> bgimage});
  background-position: 50% 50%;
  background-size:100% 190%;
  filter:saturate(2);
  width:100%;
  overflow:hidden;
  // box-shadow:0 1px 0 1px 5px 1px white;
  margin:5px auto;
  animation: ${({animation})=> animation};
  @keyframes monkeyEffect {
    from { opacity:0;background-position:100% 80%;}
    to { opacity:1 ;background-position:50% 50%;}
  }
  @media screen and (max-width:920px){
    width:100%;
    background-position: 30% 70%;
  background-size:150% 120%;
  }
  @media screen and (max-width:900px){
    width:100%;
    background-position: 50% 80%;
  background-size:100% 100%;
  }
  @media screen and (max-width:600px){
    width:350px;
    top:0%;
    background-size:300% 150%;
    background-position: 15% 100%;
    @keyframes monkeyEffect {
      from { opacity:0;background-position:100% 80%;}
      to { opacity:1;background-position:15% 100%;}
    }
    
  }
  @media screen and (max-width:380px){
    width:350px;
    top:0%;
    background-size:300% 150%;
    background-position: 10% 60%;
    @keyframes monkeyEffect {
      from { opacity:0;background-position:100% 80%;}
      to { opacity:1;background-position:10% 60%;}
    }
    
  }
`;
const CustWeDesign=styled.div`
margin:auto;
position:absolute;
display:flex;
flex-direction:column;
align-items:center;
right:10%;
color:white;
width:30%;
padding:3px;
// box-shadow:1px 1px 6px 2px white;
opacity:${({opacity})=>opacity};
transform:translateX(0%);
animation: ${({animation})=>animation};
@keyframes weDesignEffect {
  from { opacity:0;transform:translateY(-100%);}
  to { opacity:1;transform:translateY(0%);}
}
@media screen and (max-width:920px){
  right:0%;
  top:48%;
  width:70%;
  background:rgba(0,0,0,.1);
}
@media screen and (max-width:900px){
  right:0%;
  top:40%;
  width:70%;
  background:rgba(0,0,0,.1);
}
@media screen and (max-width:600px){
  right:0%;
  width:100%;
  top:25%;
  left:0%;
}
@media screen and (max-width:400px){
  right:0%;
  width:100%;
  top:0%;
  left:0%;
}
@media screen and (max-width:385px){
  right:0%;
  width:100%;
  top:0%;
  left:0%;
}
`;


const SubWeDevDesign = ({monkey,getTitleVariant1}) => {
    const navigate=useNavigate();
    const lionRef=React.useRef();
    const weDesignRef=React.useRef();
    const {staticImage2}=React.useContext(GeneralContext);
    const [isMovePic,setIsMovePic]=React.useState(false);
    const [isMovePara,setIsMovePara]=React.useState(false);

    React.useEffect(()=>{
      let threshold=window.innerWidth <900 ? 0.5 :0.7;
        const observer=new IntersectionObserver((entries)=>{
            let entry=entries[0];
            if(entry.isIntersecting){
                setIsMovePic(true);
            }
        },{threshold:threshold});
        if(lionRef.current){
            observer.observe(lionRef.current);
            return () => {
              observer.disconnect();
            };
        }
    },[]);

    React.useEffect(()=>{
      let threshold=window.innerWidth <900 ? 0.5 :0.7;
        const observer=new IntersectionObserver((entries)=>{
            let entry=entries[0];
            if(entry.isIntersecting){
                setIsMovePara(true);
            }
        },{threshold:threshold});
        if(weDesignRef.current){
            observer.observe(weDesignRef.current);
            return () => {
              observer.disconnect();
            };
        }
    },[]);

    const handleSendRequest=(e)=>{
        e.preventDefault();
        navigate('/designs');
      }

  return (
    <NewBanner1
        ref={lionRef}
        bgimage={monkey}
        animation={isMovePic ? "monkeyEffect 2s ease-in-out":""}
        opacity={isMovePic ? "1":"0"}
          className={styles.banner1}
          
        >
          <CustWeDesign 
          ref={weDesignRef}
          opacity={isMovePara ? "1":"0"}
          animation={isMovePara ? "weDesignEffect 5s ease-in-out":""}
          >
            <Typography
              component="h1"
              variant={getTitleVariant1}
              className={styles.write}
              sx={{fontFamily:"'Philosopher', sans-serif"}}
            >
              We Design
            </Typography>
            <Typography component="h1" variant="h5" className={styles.write}
            sx={{fontFamily:"'Philosopher', sans-serif",width:{xs:"85%"}}}
            >
              We design, using the 3-click method along with the golden-rule to attain symmetrical and responsive balance with effect.
            </Typography>
            <Stack direction="column" className={styles.contact}>
              <Fab variant="extended" color="secondary" size="medium" onClick={(e)=>handleSendRequest(e)}>
                <BrushIcon sx={{ mr: 2 }} />
                View Our Designs
              </Fab>
            </Stack>
          </CustWeDesign>
        </NewBanner1>
  )
}

export default SubWeDevDesign;