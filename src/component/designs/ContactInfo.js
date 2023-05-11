import React from 'react';
import styles from './design.module.css';
import {Typography} from '@mui/material';
import ScrollerDataContent from './ScrollerDataContent';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styled from 'styled-components';

const CustContact=styled.div`
margin:0;
min-height:50vh;
display:flex;
width:100vw;
position:relative;
flex-direction:column;
margin-bottom:2rem;
position:relative;
align-items:center;
justify-content:center;
background-image:url(${({bgimage})=>bgimage});
background-position:50% 50%;
background-size:100% 100%;
@media screen and (max-width:900px){
  background-size:150% 100%;
  background-position:55% 50%;
}
@media screen and (max-width:600px){
  min-height:60vh;
  background-size:150% 100%;
  background-position:55% 50%;
}
`;


const ContactInfo = ({contactInfo}) => {
  const {staticImage}=React.useContext(GeneralContext);
  const chatDesigns=`${staticImage}/extra/chatDesigns.png`;
    const contactRef=React.useRef();
    const [activate,setActivate]=React.useState(false);
    const is600 = (window.innerWidth <600 ) ? "h3":"h2";

    React.useEffect(()=>{
        const observer=new IntersectionObserver((entries)=>{
            let entry=entries[0];
            setActivate(entry.isIntersecting);
        },{threshold:0.5});
        observer.observe(contactRef.current);
    },[]);
  return (
    <CustContact
    bgimage={chatDesigns}
    ref={contactRef}
    >
    <div className={activate ? styles.contactInfo : styles.contactInfoClose}>
        <div style={{ margin: "auto",boxShadow:"1px 1px 10px 1px ",padding:"0.5rem" }}>
                      
            <Typography
              component="h1"
              variant={is600}
              sx={{ margin: "1rem auto" }}
              className={styles.contactFontStyle}
            >
              CHAT WITH US
            </Typography>
            {contactInfo &&
              contactInfo.map((obj, index) => (
                <div key={`${obj.id}--${index}`}>
                  <ScrollerDataContent obj={obj}/>
                </div>
              ))}
         
        </div>
      </div>
      </CustContact>
   
  )
}

export default ContactInfo