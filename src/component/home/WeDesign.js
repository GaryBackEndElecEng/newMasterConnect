import React from "react";
// import {GeneralContext} from "../../context/GeneralContextProvider";
import {Link} from 'react-router-dom';
// import "../App.css";
import styled from "styled-components";
import { Stack, Typography, Container, } from "@mui/material";
import styles from "./home.module.css";
import PhraseEffect from './PhraseEffect';

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
                    <Typography component="h1" variant={sizeLet2}>
                    <span className={styles.fontStyle}>H</span>onor
                    </Typography>
                    <Typography component="h1" variant={sizeLet2} style={{width:"100%"}}>
                        We understand the importance of your company's site to its image and virtue is honorable to us to serve you.
                    </Typography>
                    <Typography component="h1" variant={sizeLet2}>
                    <span className={styles.fontStyle}>I</span>ntegrity
                    </Typography>
                    <Typography component="h1" variant={sizeLet2} >
                    The wholeness of the design needs to convey your company's values.
                    </Typography>
                    <Typography component="h1" variant={sizeLet2}>
                    <span className={styles.fontStyle}>R</span>eturn
                    </Typography>
                    <Typography component="h1" variant={sizeLet2} >
                    Revenue works on both ends- serving clients well while saving $$$ is core to your business and core to our aim - to meet your expectation.
                    </Typography>
                    <Typography component="h1" variant={sizeLet2}>
                    <span className={styles.fontStyle}>E</span>volution
                    </Typography>
                    <Typography component="h1" variant={sizeLet2} >
                    We understand that a site's functionality, look and touch reflects your company's texture, appearance, performance and values. We design & develop with forward thinking to incorporate scalability.
                    </Typography>
                    <Typography component="h1" variant={sizeLet2}>
                    <span className={styles.fontStyle}>U</span>nity
                    </Typography>
                    <Typography component="h1" variant={sizeLet2} >
                    Understanding who your are, requires communication discoveries. With united talk, the act, allows us to design with uniqueness to meet your needs.
                    </Typography>
                    <Typography component="h1" variant={sizeLet2}>
                    <span className={styles.fontStyle}>S</span>teadfast
                    </Typography>
                    <Typography component="h1" variant={sizeLet2} >
                        We are loyal and devoted to your needs, with military backing - much through hardwork and perserverance. Loyalty allows us to grow with you and to becomes friends. 
                    </Typography>
                    
                    
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
                    <Typography component="h1" variant={sizeLet2} style={{marginTop:"3rem"}}
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