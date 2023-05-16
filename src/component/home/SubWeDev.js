import React from 'react';
import {useNavigate} from 'react-router-dom';
// import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from './home.module.css';
import styled from 'styled-components';
import {Typography,Stack,Fab,Box} from "@mui/material";
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';


const CustBanner2=styled.div.attrs({className:styles.banner2})`
position:relative;
opacity:${({isMovePic})=>isMovePic ? "1":"0"};
    margin:1rem auto;
    min-height:50vh;
    width:100%;
    background-image:url(${({bgimage})=>bgimage});
    filter:saturate(1.75);
    background-position: 50% 50%;
    background-size:100% 150%;
    // border:1px solid white;
    animation:${({isMovePic})=>isMovePic ? "moveLeftAndGrow":""} 2s ease-out;
@keyframes moveLeftAndGrow {
    from {opacity:0;transform:translateY(-50%);background-size:100% 90%;}
    to {opacity:1;transform:translateY(0%);background-size:100% 150%;}
}

@media screen and (max-width:900px){
  background-position: 50% 0%;
  background-size:150% 150%;
  @keyframes moveLeftAndGrow {
    from {opacity:0;transform:translateY(-50%);background-size:100% 90%;}
    to {opacity:1;transform:translateY(0%);background-size:150% 150%;}
}

}
@media screen and (max-width:600px){
  min-height:50vh;
  background-position: 50% 55%;
  background-size:200% 150%;
  @keyframes moveLeftAndGrow {
    from {opacity:0;transform:translateY(-50%);background-size:100% 90%;}
    to {opacity:1;transform:translateY(0%);background-size:200% 150%;}
}
}

`;
const CustDevpara=styled.div`
position:absolute;
    top:20%;
    left:0%;
    width:30%;
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-left:40px;
animation:${({isMovePara})=>isMovePara ? "moveLeftAndGrow":""} 5s ease-out;
@keyframes moveLeftAndGrow {
    from {transform:translateX(100%);}
    to {transform:translateX(0%);}
}
@media screen and (max-width:900px){
  top:58%;
  left:10%;
  width:70%;
  margin:10px;
  background-color:rgba(0,0,0,.4);
}
@media screen and (max-width:800px){
  top:54%;
  left:10%;
  width:70%;
  margin:10px;
  background-color:rgba(0,0,0,.4);
}
@media screen and (max-width:600px){
  top:40%;
    left:1%;
    padding:2px;
    width:100%;
    margin-left:2px;
     background-color:rgba(0,0,0,.2);
  
}
@media screen and (max-width:380px){
  top:26%;
    left:1%;
    padding:2px;
    width:100%;
    margin-left:2px;
     background-color:rgba(0,0,0,.2);
  
}
`;

const SubWeDev = ({lionest,getTitleVariant1}) => {
const navigate=useNavigate();
    const lionestRef=React.useRef();
    const weDevRef=React.useRef();
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
        if(lionestRef.current){
            observer.observe(lionestRef.current);
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
        if(weDevRef.current){
            observer.observe(weDevRef.current);
            return () => {
              observer.disconnect();
            };
        }
    },[]);

    const handleDesigns=(e)=>{
        e.preventDefault();
        navigate('/process');
      }
  return (
    <CustBanner2
          // className={styles.banner2}
          ref={lionestRef}
          isMovePic={isMovePic}
          bgimage={lionest}
        >
          <CustDevpara
          ref={weDevRef}
          isMovePara={isMovePara}
          >
            <div>
              <Typography
                component="h1"
                variant={getTitleVariant1}
                className={styles.write}
                sx={{opacity:1,fontFamily:"'Philosopher', sans-serif"}}
              >
                We Develop
              </Typography>
              <Typography component="h1" variant="h5" className={styles.write} sx={{opacity:1}}>
               We develop, with the need to maximize data capture with ease while minimizing admin and client's effort.
              </Typography>
            </div>
            <Stack direction="column" className={styles.contact} sx={{opacity:1}}>
              <Fab variant="extended" color="primary" size="medium" onClick={(e)=>handleDesigns(e)} sx={{width:{xs:"80%",md:"90%"}}}>
                <DeveloperBoardIcon sx={{ mr: 2 }} />
                See Our Process
              </Fab>
            </Stack>
          </CustDevpara>
        </CustBanner2>
  )
}

export default SubWeDev