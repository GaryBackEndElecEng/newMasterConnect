import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import styles from './corporate.module.css';
import {Typography,Grid,Fab} from '@mui/material';
import {GeneralContext} from '../../context/GeneralContextProvider';

const CustSEOcommerce=styled.div`
margin:auto;
position:relative;
padding-inline:2rem;
overflow:hidden;
height:120vh;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background:var(--background-scalable);

@media screen and (max-width:900px){
height:130vh;
}
@media screen and (max-width:600px){
  height:230vh;
  
}
@media screen and (max-width:380px){
  height:290vh;
  
}
`;

const SEOcommerce = ({generalInfo,typoSize}) => {
    const SEORef=React.useRef(null);
  const {staticImage}=React.useContext(GeneralContext);
  const [startSEO,setStartSEO]=React.useState(null);
    const pointer=`${staticImage}/corporate/pointer2.png`;
    const navigate=useNavigate();
    const [contactInfo,setContactInfo]=React.useState({loaded:false,data:{}})
    const threshold=window.innerWidth < 900 ? (window.innerWidth <600 ? 0.3 :0.5):0.9;

    React.useEffect(()=>{
        const observer = new IntersectionObserver(entries=>{
            let entry=entries[0];
            setStartSEO(entry.isIntersecting);
        },{threshold:threshold});

        if(SEORef.current){
            observer.observe(SEORef.current);
        }
    },[]);

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
    <CustSEOcommerce>

<Grid container spacing={{xs:1,sm:2,md:5}}
        sx={{maxHeight:"100%"}}
        className={styles.parentGridScalable}
        >
            <Grid item xs={12} sm={12} md={4}
            ref={SEORef}
            >
                <p className={startSEO ? styles.fontStyleScalableOn :styles.fontStyleScalable}
                >
                    SEO , Ecommerce
                </p>
                <Typography component="h1" variant={typoSize}>
                    "Search Engine Optimization : Librarian filing a book (website) "
                </Typography>
                <Typography component="h1" variant={typoSize}>
                    "Ecommerce are first in searches "
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
            <p className={startSEO ? styles.fontStyleScalableOn :styles.fontStyleScalable}>
                 ISSUE
                </p>
                <ul>
            <Typography component="li" variant="h5" sx={{color:"white"}}>
                    incorrect words or not-found words on a site dramtically reduces hits.
                </Typography>
            <Typography component="li" variant="h5" sx={{color:"white"}}>
                    unformatted meta is not presented on searches.
                </Typography>
            <Typography component="li" variant="h5" sx={{color:"white"}}>
                    increasing site traffic from Ecommerce after-purchase can be done ?
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
                    Dynamically pull word lists and images from content for both meta and JSON + scripts search Engine feeds reduces errors and improve hits.
                </Typography>
            <Typography component="li" variant="h5" sx={{color:"white", listStyleImage:`url(${pointer})`}}
            className={styles.pointer}
            >
                    Telling Google of new content improves update times.
                </Typography>
            <Typography component="li" variant="h5" sx={{color:"white", listStyleImage:`url(${pointer})`}}
            className={styles.pointer}
            >
                    Ecommerce API calls upon purchases, improves traffic and hit rates; 
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
                LET'S TALK to increase $$$
                </p>
            </Grid>
            <Grid item xs={12} sm={6}
            className={styles.buttonFlex}
            >
            <a href={`tel:${contactInfo.loaded ? contactInfo.data.cell :""}`}>
             <Fab color="secondary" size="large" variant="extended"> call Us</Fab>
             </a>
             <Fab color="primary" size="large" variant="extended" onClick={(e)=>handleMessage(e)}> message Us</Fab>
             <a href={contactInfo.loaded ? `mailto:${contactInfo.data.email}` : ""}>
             <Fab color="info" size="large" variant="extended"> email Us</Fab>
             </a>
            </Grid>
        </Grid>


    </CustSEOcommerce>
  )
}

export default SEOcommerce