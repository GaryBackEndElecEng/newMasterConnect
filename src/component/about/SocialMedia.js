import React from 'react';
import {Link} from 'react-router-dom';
import {Grid,Avatar, Container} from '@mui/material';
import styles from './about.module.css';
import styled from 'styled-components';
import {GeneralContext} from '../../context/GeneralContextProvider';
import SocialItem from './SocialItem';

const CustSocialGrid=styled(Grid)`
margin: 2rem auto;
opacity:1;
justify-content:center;
align-items:center;
// border:1px solid red;
transition:all 1s ease-in-out;
@media screen and (max-width:900px){
    margin:3rem auto;
}
@media screen and (max-width:400px){
    // padding-inline:10px;
    margin:2rem auto;
    
}
`;

const SocialMedia = ({contactInfo}) => {
    const {staticImage}=React.useContext(GeneralContext);
const [mediaArr,setMediaArr]=React.useState({loaded:false,data:[]});
// const [open,setOpen]=React.useState(false);

    React.useEffect(()=>{
        function returnContext(arr){
            let Arr=[];
            if(arr.length>0){
                arr.forEach((item,index)=>{
                    let key=item.split("::")[0];
                    let value=item.split("::")[1];
                    if(key.startsWith("f") || key.startsWith("F")){
                        Arr.push({name:"facebook",link:value,icon:<Avatar src={`${staticImage}/icons/facbbook.png`} className={styles.icon} alt="www.masterconnect.ca"/>});
                    }else if(key.startsWith("l") || key.startsWith("L")){
                        Arr.push({name:"linkedln",link:value,icon:<Avatar src={`${staticImage}/icons/linkedln.png`} className={styles.icon} alt="www.masterconnect.ca"/>});
                    }else if(key.startsWith("in") || key.startsWith("I")){
                        Arr.push({name:"Intagarm",link:value,icon:<Avatar src={`${staticImage}/icons/instagram.png`} className={styles.icon} alt="www.masterconnect.ca"/>});
                    }else if(key.startsWith("m") || key.startsWith("M")){
                        Arr.push({name:"Masterconnect",link:value,icon:<Avatar src={`${staticImage}/logo.png`} className={styles.iconLogo} alt="www.masterconnect.ca"/>});
                    }else if(key.startsWith("git") || key.startsWith("M")){
                        Arr.push({name:"Masterconnect",link:value,icon:<Avatar src={`${staticImage}/icons/gitHub.png`} className={styles.icon} alt="www.masterconnect.ca"/>});
                    }
                });
            }
            return Arr;
        }
        if(contactInfo.loaded){

            setMediaArr({loaded:true,data:returnContext(contactInfo.data.siteArray)});
        }
    },[contactInfo.loaded,contactInfo.data,staticImage]);

    
    

  return (
    <Container maxWidth="lg" >
    <CustSocialGrid
    container
    spacing={{xs:2,sm:3,md:4}}
    // open={true}
    >
        {
            mediaArr.loaded ?
            mediaArr.data.map((obj,index)=>(
                <Grid item xs={4}  sm={2} key={`${index}-icons`}>
                    
                    <SocialItem obj={obj}
                    index={index}/>
                   
                </Grid>
            ))

            :
            <div><h6>loading...</h6></div>
        }
   
    </CustSocialGrid>
    </Container>
  )
}

export default SocialMedia