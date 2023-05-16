import React from "react";
// import {GeneralContext} from "../../context/GeneralContextProvider";
import {Link} from 'react-router-dom';
// import "../App.css";
import styled from "styled-components";
import { Stack, Typography, Container, } from "@mui/material";
import styles from "./home.module.css";
import wedesignContext from './wedesignContext';

import PhraseEffect from './PhraseEffect';
import Honor from './Honor';
import Integrity from './Integrity';
import Return from './Return';
import Evolution from './Evolution';
import Unity from './Unity';
import Steadfast from './Steadfast';
import ConnectingYou from './ConnectingYou';

const CustWeDesign = styled.div.attrs({className:styles.mainSection})`
margin:0 auto;
position:static;
left:0px;
opacity:${({opacity})=>opacity };
margin-bottom:4.5vh;
width:100vw;
z-index:100;
display: flex;
flex-direction: column;
align-items: center;
justify-content:center;
background:var(--background-111);
background-size:120% 200%;
background-position:50% 50%;  //start:Y:40% end -40%
transition:all ${({seconds})=>seconds }s linear;
@media screen and (max-width:900px){
    background-position:50%  0%;
    background-size:150% 150%;
}
@media screen and (max-width:600px){
    background-position:50%  0%;
    background-size:150% 100%;
}


`;



const WeDesign = ({generalInfo}) => {
    const WebDesignRef2=React.useRef();
    // const WebDesignRef3=React.useRef();
    // const {staticImage2}=React.useContext(GeneralContext);
    const [sizeLet,setSizeLet]=React.useState("h1");
    const [sizeLet2,setSizeLet2]=React.useState("span");
    const [show,setShow]=React.useState(false);
    const [getHonor,setGetHonor]=React.useState({loaded:false,data:{}});
    const [getIntegrity,setGetIntegrity]=React.useState({loaded:false,data:{}});
    const [getReturn,setGetReturn]=React.useState({loaded:false,data:{}});
    const [getEvolution,setGetEvolution]=React.useState({loaded:false,data:{}});
    const [getUnity,setGetUnity]=React.useState({loaded:false,data:{}});
    const [getSteadfast,setGetSteadfast]=React.useState({loaded:false,data:{}});

    React.useEffect(()=>{
        if(wedesignContext){
            setGetHonor(
                {
                    loaded:true,
                    data:wedesignContext.filter(obj=>(obj.object==="honor"))[0]
                }
            )
            setGetIntegrity(
                {
                    loaded:true,
                    data:wedesignContext.filter(obj=>(obj.object==="integrity"))[0]
                }
            )
            setGetReturn(
                {
                    loaded:true,
                    data:wedesignContext.filter(obj=>(obj.object==="return"))[0]
                }
            )
            setGetEvolution(
                {
                    loaded:true,
                    data:wedesignContext.filter(obj=>(obj.object==="evolution"))[0]
                }
            )
            setGetUnity(
                {
                    loaded:true,
                    data:wedesignContext.filter(obj=>(obj.object==="unity"))[0]
                }
            )
            setGetSteadfast(
                {
                    loaded:true,
                    data:wedesignContext.filter(obj=>(obj.object==="steadfast"))[0]
                }
            )
        }
    },[]);

    React.useEffect(()=>{
        if(window.innerWidth <900){
            setSizeLet("h3");
            setSizeLet2("h4");
        }if(window.innerWidth <600){
            setSizeLet("h4");
            setSizeLet2("span");
        }else{
            setSizeLet("h2");
            setSizeLet2("h4");
        }
    },[setSizeLet,setSizeLet2]);

    

    React.useEffect(()=>{
        const observer=new IntersectionObserver((entries)=>{
            entries.forEach((entry,index)=>{
                if(entry.isIntersecting){
                    
                    setShow(true);
                }else{
                    
                   
                }
            });

        },{threshold:0.2});
        let arr=[WebDesignRef2];
        arr.forEach((entry,index)=>{
            if(entry.current){
        observer.observe(entry.current);
        return () => {
            observer.disconnect();
          };
            }
    });
    },[]);
  return (
    <CustWeDesign
    opacity={show ? "1":"0"}
    seconds={show ? "1.5":"0.1"}
    className={styles.mainSection}
    >
        <Container maxWidth="xl" ref={WebDesignRef2} className={show ? styles.showWeDesign : styles.hideWeDesign}>
            <div className={styles.mainInnerSection}>

                    
                    <p className={styles.fontStyleDesignOn}
                    sx={{width:"100%",fontFamily:"'Philosopher', sans-serif"}}
                    >
                    We specialize in Digital Stories, Videos and Data Retension through Technology and effects
                    </p>
                    <p className={styles.fontStyleDesignOn}
                    sx={{width:"100%",fontFamily:"'Philosopher', sans-serif"}}
                    >
                    We Want Your Business
                    </p>
                
            </div>
            <div className={styles.mainInnerSection} >
                <Stack direction="column" sx={{justifyContent:"center",alignItems:"flex-start",width:"100%"}}
               
                >
                    <p className={styles.fontStyleNormal}
                    style={{width:"100%"}}
                    >
                    Our Values:
                    </p>
                    <Honor sizeLet2={sizeLet2} obj={getHonor.loaded && getHonor.data}/>
                    <Integrity sizeLet2={sizeLet2} obj={getIntegrity.loaded && getIntegrity.data}/>
                    <Return sizeLet2={sizeLet2} obj={getReturn.loaded && getReturn.data}/>
                    <Evolution sizeLet2={sizeLet2} obj={getEvolution.loaded && getEvolution.data}/>
                    <Unity sizeLet2={sizeLet2} obj={getUnity.loaded && getUnity.data}/>
                    <Steadfast sizeLet2={sizeLet2} obj={getSteadfast.loaded && getSteadfast.data}/>
                </Stack>
            </div>
            <div className={styles.mainInnerSection}>
                <Stack direction="column" sx={{justifyContent:"center",alignItems:"flex-start",width:"100%"}}
                
                >
                    <Typography component="h1" variant={sizeLet2} style={{marginTop:"3rem"}}
                    className={styles.ourwebDesignBg}
                    >
                     Our <Link to="/designs" className={styles.linkOn}>web-Design</Link> and development <Link to="/services" className={styles.linkOn}>Services</Link> contains B2B, B2C web design, mobile applications, digital strategy, email marketing and CMS development Services. 
                    </Typography>
                    < PhraseEffect sizeLet2={sizeLet2} generalInfo={generalInfo}/>
                    <ConnectingYou  sizeLet2={sizeLet2} />
                </Stack>
            </div>
        </Container>
    </CustWeDesign>
  )
}

export default WeDesign