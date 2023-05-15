import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import styles from './corporate.module.css';
import {Typography,Grid, Avatar, Fab} from '@mui/material';
import {GeneralContext} from '../../context/GeneralContextProvider';

const CustScalable=styled.div`
margin:auto;
position:relative;
padding-inline:2rem;
overflow:hidden;
height:100vh;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background:var(--background-scalable);
@media screen and (max-width:900px){
height:120vh;
}
@media screen and (max-width:600px){
    height:220vh;
    
}
@media screen and (max-width:380px){
    height:290vh;
    
}
`;

const Scalable = ({generalInfo,typoSize}) => {
    const {staticImage}=React.useContext(GeneralContext);
    const pointer=`${staticImage}/corporate/pointer2.png`;
    const navigate=useNavigate();
    const [contactInfo,setContactInfo]=React.useState({loaded:false,data:{}})
    

    React.useEffect(()=>{
        if(generalInfo.loaded){
            let arr=generalInfo.data.siteArray;
            let email="";
            arr.forEach((obj,index)=>{
                if(obj.startsWith("email")){
                    email=obj.split("::")[1]
                }
            });
            setContactInfo({
                loaded:true,
                data:{
                    cell:generalInfo.data.cell,
                    email:email
                }
            })
            
        }
    },[generalInfo.loaded,generalInfo.data]);

    const handleMessage=(e)=>{
        e.preventDefault();
        navigate("/contact");
    }
    
  return (
    <CustScalable
    className={styles.custScalable}
    >
        <Grid container spacing={{xs:1,sm:2,md:5}}
        sx={{maxHeight:"100%"}}
        className={styles.parentGridScalable}
        >
            <Grid item xs={12} sm={12} md={4}>
                <p className={styles.fontStyleScalable}
                >
                    SCALABILITY
                </p>
                <Typography component="h1" variant={typoSize}>
                    "Increase or decrease resources to meet higher or lower demand."
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
                <ul>
            <Typography component="li" variant="h5" sx={{color:"white"}}>
                    increased traffic slows down corporate response ?
                </Typography>
            <Typography component="li" variant="h5" sx={{color:"white"}}>
                    decreased sales attributed to unaware market sentiments ?
                </Typography>
            <Typography component="li" variant="h5" sx={{color:"white"}}>
                    increased sales associated to seasonal swings ?
                </Typography>
            
                </ul>
            </Grid>
        </Grid>
        <div className={styles.hr_line}/>
        <Grid container spacing={{xs:1,sm:2,md:5}}
        className={styles.parentGridScalable}
        >
            <Grid item xs={12} sm={12} md={4}
            className={styles.stackScalable}
            >
            <p className={styles.fontStyleScalable2}>
                 SOLUTION
                </p>
            </Grid>
            <Grid item xs={12} sm={12} md={8}
            className={styles.stackScalable}
            >
             <ul>
            <Typography component="li" variant="h5" sx={{color:"white", listStyleImage:`url(${pointer})`}}
            className={styles.pointer}
            >
                    automate statistic from client and sales feedback to revenue;
                </Typography>
            <Typography component="li" variant="h5" sx={{color:"white", listStyleImage:`url(${pointer})`}}
            className={styles.pointer}
            >
                    automate marketing and product/service changes to revenue; 
                </Typography>
            <Typography component="li" variant="h5" sx={{color:"white", listStyleImage:`url(${pointer})`}}
            className={styles.pointer}
            >
                    automate realtime adjustment margins per quarter.
                </Typography>
            <Typography component="li" variant="h5" sx={{color:"white", listStyleImage:`url(${pointer})`}}
            className={styles.pointer}
            >
                    Implement dynamic API client feeds to Search Engines and Social-media markets for improved hits.
                </Typography>
            
                </ul>
            </Grid>
        </Grid>
        <div className={styles.hr_line}/>
        <Grid container spacing={{xs:1,sm:2,md:5}}
        className={styles.parentGridScalable}
        >
            <Grid item xs={12} sm={6}
            className={styles.stackScalable}
            >
            <p className={styles.fontStyleScalable3}>
                LET'S TALK to save $$$
                </p>
            </Grid>
            <Grid item xs={12} sm={6}
            className={styles.buttonFlex}
            >
            <a href={contactInfo.loaded ? `tel:${contactInfo.data.cell}`:""}>
             <Fab color="secondary" size="large" variant="extended"> call Us</Fab>
             </a>
             <Fab color="primary" size="large" variant="extended" onClick={(e)=>handleMessage(e)}> message Us</Fab>
             <a href={contactInfo.loaded ? `mailto:${contactInfo.data.email}`:""}>
             <Fab color="info" size="large" variant="extended"> email Us</Fab>
             </a>
            </Grid>
        </Grid>

    </CustScalable>
  )
}

export default Scalable