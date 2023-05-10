import React from "react";
// import {GeneralContext} from "../../context/GeneralContextProvider";
import {Link} from 'react-router-dom';
// import "../App.css";
import styled from "styled-components";
import { Stack, Typography, Container, } from "@mui/material";
import styles from "./home.module.css";

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



const WeDesign = () => {
    const WebDesignRef2=React.useRef();
    // const WebDesignRef3=React.useRef();
    // const {staticImage2}=React.useContext(GeneralContext);
    const [sizeLet,setSizeLet]=React.useState("h1");
    const [sizeLet2,setSizeLet2]=React.useState("span");
    const [show,setShow]=React.useState(false);

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
                    Digital Stories, Videos and Data Retension through Technology and effects
                    </p>
                
            </div>
            <div className={styles.mainInnerSection} >
                <Stack direction="column" sx={{justifyContent:"center",alignItems:"flex-start",width:"100%"}}
               
                >
                    <Typography component="h1" variant={sizeLet2}>
                    <span className={styles.fontStyle}>H</span>onor
                    </Typography>
                    <Typography component="h1" variant={sizeLet2} style={{fontFamily:"'Philosopher', sans-serif",width:"100%"}}>
                        We understand the importance of your company's site to its image and virtue.
                    </Typography>
                    <Typography component="h1" variant={sizeLet2}>
                    <span className={styles.fontStyle}>I</span>ntegrity
                    </Typography>
                    <Typography component="h1" variant={sizeLet2} style={{fontFamily:"'Philosopher', sans-serif"}}>
                    The wholeness of the design needs to convey your company's values. In understanding this, we commit to your needs.
                    </Typography>
                    <Typography component="h1" variant={sizeLet2}>
                    <span className={styles.fontStyle}>R</span>eturn
                    </Typography>
                    <Typography component="h1" variant={sizeLet2} style={{fontFamily:"'Philosopher', sans-serif"}}>
                    Revenue works on both ends- serving clients well while saving $$$ is core to your business and core to our aim - to meet your expectation.
                    </Typography>
                    <Typography component="h1" variant={sizeLet2}>
                    <span className={styles.fontStyle}>E</span>volution
                    </Typography>
                    <Typography component="h1" variant={sizeLet2} style={{fontFamily:"'Philosopher', sans-serif"}}>
                    We understand that a site's functionality, look and touch reflects your company's texture, appearance and performance. We design & develop with forward thinking to allow your site to grow as you grow - envisioning what will be, is what we do.
                    </Typography>
                    <Typography component="h1" variant={sizeLet2}>
                    <span className={styles.fontStyle}>U</span>nity
                    </Typography>
                    <Typography component="h1" variant={sizeLet2} style={{fontFamily:"'Philosopher', sans-serif"}}>
                    Understanding what you are about, requires harmony and starts with an introduction. We are keen in knowing you. With a listening ear, understanding who you are, allows us to design a unique solution that meets your expectation and differentiates you from others.
                    </Typography>
                    <Typography component="h1" variant={sizeLet2}>
                    <span className={styles.fontStyle}>S</span>teadfast
                    </Typography>
                    <Typography component="h1" variant={sizeLet2} style={{fontFamily:"'Philosopher', sans-serif"}}>
                        We are loyal, consistent and devoted to your needs - through hardwork and perserverance. In doing so, allows us to grow with you. In doing so, allows us to becomes friends. 
                    </Typography>
                    
                    
                </Stack>
            </div>
            <div className={styles.mainInnerSection}>
                <Stack direction="column" sx={{justifyContent:"center",alignItems:"flex-start",width:"100%"}}
                
                >
                    <Typography component="h1" variant={sizeLet2} style={{fontFamily:"'Philosopher', sans-serif",marginTop:"3rem"}}
                    className={styles.ourwebDesignBg}
                    >
                     Our <Link to="/designs" className={styles.linkOn}>web-Design</Link> and development <Link to="/services" className={styles.linkOn}>Services</Link> contains B2B, B2C web design,mobile applications, digital strategy,email marketing and CMS development Services. 
                    </Typography>
                    <Typography component="h1" variant={sizeLet2} style={{fontFamily:"'Philosopher', sans-serif",marginTop:"3rem"}}
                    className={styles.ourwebDesignBg}
                    >
                     We believe and thrive to help, 
                    </Typography>
                    <Typography component="h1" variant={sizeLet2} style={{fontFamily:"'Philosopher', sans-serif",marginTop:"3rem"}}
                    className={styles.weDesignLastPara}
                    >
                     <span span className={styles.font_masterconnect}>Masterconnect</span> - connecting you is what we do.
                    </Typography>
                </Stack>
            </div>
        </Container>
    </CustWeDesign>
  )
}

export default WeDesign