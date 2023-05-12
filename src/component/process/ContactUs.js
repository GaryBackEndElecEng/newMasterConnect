import React from "react";
import {useNavigate} from 'react-router-dom';
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./process.module.css";
import { Fab, Stack, } from "@mui/material";
import styled from "styled-components";
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';


const CustProcessContact=styled.div`
margin:0rem auto;
margin-bottom:2rem;
width:100vw;
min-height:50vh;
opacity:${({opacity})=>opacity};
display: flex;
justify-content:space-around;
align-items:center;
flex-wrap:wrap;
background-image:url(${({bgimage})=>bgimage});
background-size:100% 100%;
background-position: 100% 100%;
filter:saturate(${({saturate})=>saturate});
animation: ${({animation})=>animation} ;

@keyframes growUp {
    from {opacity:0;transform:translateY(-70%);
        background-size:200% 200%;
        background-position:0% 0%;
        filter:saturate(1);
    }
    to {opacity:1;transform:translateY(0%);
        background-size:100% 100%;
        background-position:50% 50%;
        filter:saturate(2);
    }
}
@media screen and (max-width:900px){
    background-size:300% 100%;
    background-position: 45% 100%;
    margin:auto 0.5rem;
    padding:0.5rem;
    @keyframes growUp {
        from {opacity:0;transform:translateY(-70%);
            background-size:200% 200%;
            background-position:0% 0%;
            filter:saturate(1);
        }
        to {opacity:1;transform:translateY(0%);
            background-size:300% 100%;
            background-position:45% 100%;
            filter:saturate(2);
        }
    }
}

`;


const ContactUs = () => {
    const navigate=useNavigate();
    const contactRef=React.useRef(null);
    const {staticImage}=React.useContext(GeneralContext);
    const zebra1=`${staticImage}/zebra/zebra1.png`;
    const greenEffect=`${staticImage}/extra/greenEffect.png`;
    const [contactOpen,setContactOpen]=React.useState(false);
    const threshold=window.innerWidth < 900 ? 0.3 : 0.7;

    React.useEffect(()=>{
        const observer=new IntersectionObserver((entries)=>{
            let entry=entries[0];
            if(entry.isIntersecting){
               setContactOpen(true);
            }
        },{threshold:threshold});
        if(contactRef.current){
    
            observer.observe(contactRef.current);
            return ()=>observer.disconnect();
        }
    },[]);

    const handleContact=(e)=>{
        navigate('/contact');
    }
    

  return (
    <CustProcessContact
    
    opacity={contactOpen ? "1":"0"}
    animation={contactOpen ? "growUp 2s ease-in-out":""}
    ref={contactRef}
    bgimage={zebra1}
    saturate={contactOpen ? "2":"1"}
    className={styles.custProcessContact}
    >
        <Stack direction="column" spacing={2}>
            <p 
            className={styles.contactEffect}
            style={{backgroundImage:`url(${greenEffect})`}}
            >
                send a request
            </p>
            <Fab variant="extended" color="primary" size="large" onClick={(e)=>handleContact(e)}>
                send request
            </Fab>
        </Stack>
        <Stack direction="column" spacing={2}>
            <p className={styles.contactEffect}
            style={{backgroundImage:`url(${greenEffect})`}}
            >
                Call Us
            </p>
            <Fab color="info" size="large" variant="extended">
                <PhoneForwardedIcon/>
            </Fab>
            
        </Stack>
        <Stack direction="column" spacing={2}>
            <p className={styles.contactEffect}
            style={{backgroundImage:`url(${greenEffect})`}}
            >
                Email Us
            </p>
            <Fab color="secondary" size="large" variant="extended">
                <MarkEmailReadIcon/>
            </Fab>
        </Stack>
    
    </CustProcessContact>
  )
}

export default ContactUs