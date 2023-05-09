import React from 'react';
import styles from './design.module.css';
import {Typography} from '@mui/material';
import ScrollerDataContent from './ScrollerDataContent';


const ContactInfo = ({contactInfo}) => {
    const contactRef=React.useRef();
    const [activate,setActivate]=React.useState(false);

    React.useEffect(()=>{
        const observer=new IntersectionObserver((entries)=>{
            let entry=entries[0];
            setActivate(entry.isIntersecting);
        },{threshold:0.5});
        observer.observe(contactRef.current);
    },[]);
  return (
    <div className={activate ? styles.contactInfo : styles.contactInfoClose}>
        <div style={{ margin: "auto" }} ref={contactRef}>
                      
            <Typography
              component="h1"
              variant="h4"
              sx={{ margin: "1rem auto" }}
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
   
  )
}

export default ContactInfo