import React from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {useNavigate} from 'react-router-dom';
import styles from './home.module.css';
import styled from 'styled-components';
import {Typography,Stack,Fab,Box} from "@mui/material";
import ExpandIcon from '@mui/icons-material/Expand';
import SubWeDevDesign from './SubWeDevDesign';
import SubWeDev from './SubWeDev';

const CustBanner3=styled.div.attrs({className:styles.banner3})`
position:relative;
opacity:${({isMovePic})=>isMovePic ? "1":"0"};
    margin:5vh auto;
    min-height:50vh;
    width:100%;
    background-image:url(${({bgimage})=>bgimage});
    filter:saturate(1.75);
    background-position: 100% 50%;
    background-size:100% 150%;
    // border:1px solid white;
    animation:${({isMovePic})=>isMovePic ? "moveLeftAndGrow":""} 3s ease-out;
@keyframes moveLeftAndGrow {
    from {opacity:0;transform:translateY(100%);background-size:100% 90%;}
    to {opacity:1;transform:translateY(0%);background-size:100% 150%;}
}
@media screen and (max-width:900px){
  background-size:150% 150%;
  background-position: 20% 50%;
  @keyframes moveLeftAndGrow {
    from {opacity:0;transform:translateY(100%);background-size:100% 90%;}
    30% {opacity:1;transform:translateY(10%);background-size:100% 120%;}
    to {opacity:1;transform:translateY(0%);background-size:150% 150%;}
}
}
@media screen and (max-width:600px){
  background-size:200% 120%;
  background-position: 30% 80%;
  @keyframes moveLeftAndGrow {
    from {opacity:0;transform:translateY(100%);background-size:100% 90%;}
    to {opacity:1;transform:translateY(0%);background-size:200% 120%;}
}
}
`;
const CustGrow=styled.div`
opacity:${({isMovePara})=>isMovePara ? "1":"0"};
position:absolute;
top:30%;
right:2%;
width:36%;
margin:5px;
background-color:rgba(0,0,0,.6);
animation:${({isMovePara})=>isMovePara ? "moveLeftParaGrow":""} 2s ease-out;
@keyframes moveLeftParaGrow {
    from {opacity:0;transform:translateX(-100%);}
    to {opacity:1;transform:translateX(0%);}
}
@media screen and (max-width:900px){
  top:40%;
  right:3%;
  width:755px;
  padding:10px;
}
@media screen and (max-width:800px){
  top:40%;
  right:0%;
  width:755px;
  padding:10px;
}
@media screen and (max-width:600px){
  top:32%;
  right:0%;
  margin:auto ;
  padding:auto 5px;
  width:350px;
  width:100%;
  
}
@media screen and (max-width:380px){
  top:0%;
  right:0%;
  margin:auto ;
  padding:auto 5px;
  width:350px;
  width:100%;
  
}
`;


const SubWebDevGrow = ({zebra3,getTitleVariant1}) => {
  const navigate=useNavigate();
    const zebra3Ref=React.useRef();
    const weDev3Ref=React.useRef();
    // const {staticImage2}=React.useContext(GeneralContext);
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
        if(zebra3Ref.current){
            observer.observe(zebra3Ref.current);
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
        if(weDev3Ref.current){
            observer.observe(weDev3Ref.current);
        }
    },[]);

      const handleCorporate=(e)=>{
          e.preventDefault();
          navigate("/corporate");
      }

  return (
    <CustBanner3
          isMovePic={isMovePic}
          bgimage={zebra3}
          ref={zebra3Ref}
        >
          <CustGrow 
          isMovePara={isMovePara}
          ref={weDev3Ref}
          >
            <div>
              <Typography
                component="h1"
                variant={getTitleVariant1}
                className={styles.write}
                sx={{fontFamily:"'Philosopher', sans-serif"}}
              >
                We Grow
              </Typography>
              <Typography component="h1" variant="h5" className={styles.write}
              sx={{fontFamily:"'Philosopher', sans-serif"}}
              >
                We grow your business through technological assistance and hard-work, in the aim of achieving a symbiotic relationship and ultimately friendship.
              </Typography>
              <Typography component="h1" variant="h5" className={styles.write} sx={{margin:"10px auto",marginLeft:{md:"15px"},color:"whitesmoke",fontStyle:"italic",fontFamily:"'Philosopher', sans-serif"}}>
                "We are in this for the long haul."
              </Typography>
            </div>
            <Stack direction="column" className={styles.contact} >
              <Fab variant="extended" color="success" size="medium" sx={{width:{xs:"90%"}}}
              onClick={(e)=>handleCorporate(e)}
              >
                <ExpandIcon sx={{ mr: 2 }} />
                Secret to Growth
              </Fab>
            </Stack>
          </CustGrow>
        </CustBanner3>
  )
}

export default SubWebDevGrow