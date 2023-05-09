import React from 'react';
import {Link} from 'react-router-dom';
import {Typography,Stack,Grid,IconButton,Avatar,Card, SliderTrack} from '@mui/material';
import styles from './about.module.css';
import styled from 'styled-components';
import {GeneralContext} from '../../context/GeneralContextProvider';

const GeneralContact = ({ContactInfo}) => {
    const [generalInfo,setGeneralInfo]=React.useState({loaded:false,data:{}});
    React.useEffect(()=>{
        if(ContactInfo.loaded && ContactInfo.data){
            let email=ContactInfo.data.siteArray.filter(obj=>(obj.startsWith("emai")))[0].split("::")[1]
            let facebook=ContactInfo.data.siteArray.filter(obj=>(obj.startsWith("f")))[0].split("::")[1]
            let linkedln=ContactInfo.data.siteArray.filter(obj=>(obj.startsWith("l")))[0].split("::")[1]
            setGeneralInfo(
                {
                    loaded:true,
                    data:{
                        name:ContactInfo.data.name,
                        address:ContactInfo.data.address,
                        cell:ContactInfo.data.cell,
                        email:email,
                        city:ContactInfo.data.city,
                        country:ContactInfo.data.country,
                        prov:ContactInfo.data.provState,
                        postal:ContactInfo.data.postal,
                        hours:ContactInfo.data.extra,
                        facebook:facebook,
                        linkedln:linkedln
                    }
                }
            )
        }
    },[ContactInfo.loaded,ContactInfo.data]);

    const handleOpoen=(e,link)=>{
        e.preventDefault();
        window.open(link);
    }

  return (
    <Stack direction="column" sx={{justifyContent:"center",alignItems:"center",width:"100%"}}>
        {generalInfo.loaded ?
        <div>
            <a href={`mailto:${generalInfo.data.email}`}>
        <Typography component="h1" variant="h5" data-content="We'll get back ASAP!!" sx={{margin:"0.5rem auto"}}
        className={styles.link}
        >Email Us!</Typography>
        </a>
            <a href={`tel:${generalInfo.data.cell}`}>
        <Typography component="h1" variant="h5" data-content="Let's talk!" sx={{margin:"0.5rem auto"}}
        className={styles.link}
        >Call Us!</Typography>
        </a>
        {/* <Stack direction="row" sx={{justifyContent:"space-around",alignItems:"center"}}>
        <Typography component="h1" variant="h5" sx={{margin:"0.5rem auto"}} onClick={(e)=>handleOpoen(e,generalInfo.data.facebook)}>fb</Typography>
        <Typography component="h1" variant="h5" sx={{margin:"0.5rem auto"}} onClick={(e)=>handleOpoen(e,generalInfo.data.linkedln)}>ln</Typography>
        </Stack> */}
        </div>
        :
        <div><h5>loading...</h5></div>
}
    </Stack>
  )
}

export default GeneralContact