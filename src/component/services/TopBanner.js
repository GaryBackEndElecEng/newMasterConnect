import React from 'react';
import {Stack,Typography,Grid,Container} from '@mui/material';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styles from './services.module.css';
import styled from 'styled-components';
import arr from './topbanner.json';

const CustTopBanner = styled.div.attrs({className:styles.custTopBanner})`
margin:3rem 0;
position:relative;
z-index:1;
width:100%;
padding-block:1.5rem;
isolation:isolate;
display:flex;
justify-content:center;
border-radius:5%;
align-items:center;
background:var(--background-topBannerTop);
background-size:100% 100%;
flex-direction:column;
opacity:${({opacity})=>opacity};
transition:all 1.5s ease-in-out;
transform:translateY(${({translatey})=>translatey});
@media screen and (max-width:900px){
    padding-block:3.5rem;
    border-radius:3%;
    background:var(--background-topBanner);
}
@media screen and (max-width:600px){
    padding-block:3rem;
    border-radius:2%;
}
`;
const ChildGridPic=styled(Grid)`
min-height:30vh;
width:100%;
background:url(${({bgimage})=>bgimage});
background-size:${({backgroundsize})=>backgroundsize};
background-position:50% 50%;
filter:saturate(2);
transition:all 3s ease-in-out;
@media screen and (max-width:900px){
min-height:20vh;
}
@media screen and (max-width:600px){
min-height:30vh;
}
`;

const ChildGrid= styled(Grid).attrs({className:styles.topBannerchildGrid})`
margin:auto;
align-self:center;


`;
const CoverEffect = styled.div`
position:absolute;
inset:0;
width:100%;
height:100%;
z-index:-1;
background:black;
border-radius:inherit;
`;

const TopBanner = ({getWidth}) => {
const bannerRef=React.useRef(null);
const [getArr,setGetArr]=React.useState({loaded:false,data:[]});
const {staticImage}=React.useContext(GeneralContext);
const greenEffect=`${staticImage}/extra/blueEffect.png`;
const [startBanner,setStartBanner]=React.useState(null);
const [threshold,setThreshold]=React.useState(null);
const letSize=getWidth < 900 ? (getWidth < 600 ? "h6":"h4"):"h2";
const titleFont=getWidth < 900 ? (getWidth < 600 ? "h4":"h3"):"h2";

React.useEffect(()=>{
if(getWidth <900){setThreshold(0.5);}
else if(getWidth <600){setThreshold(0.2);}
else {setThreshold(0.8);}
},[]);

    React.useEffect(()=>{
        setGetArr({loaded:true,data:arr});
        const observer= new IntersectionObserver(entries=>{
            let entry=entries[0];
            if(entry.isIntersecting){
            setStartBanner(entry.isIntersecting);
            }
        },{threshold:threshold});
        if(bannerRef.current){
            observer.observe(bannerRef.current);
        }else{
            return ()=>observer.disconnect();
        }
    },[]);

  return(
    <Container maxWidth="xl">
<CustTopBanner
    opacity={startBanner ? "1":"0"}
    translatey={startBanner ? "0%":"-10%"}
    ref={bannerRef}
    className={styles.custTopBanner}
    >
        <CoverEffect/>
        <Typography component="h1" variant={titleFont} >What We Do:</Typography>
        <p 
        className={styles.titleTopBanner}
        style={{backgroundImage:`url(${greenEffect})`}}
        >Increase $$$</p>
       
            {getArr.loaded ? getArr.data.map((obj,index)=>(
                <Grid container spacing={{xs:1,sm:1,md:3}}
                sx={{margin:{sm:"0.5rem auto",xs:"auto"}}}
                key={`${obj.id}--${index}`}
                >
                    <ChildGridPic item xs={12} sm={4}
                    backgroundsize={startBanner ? "100% 100%":"200% 200%"}
                    bgimage={`${staticImage}/${obj.image}`}
                    />
                    <ChildGrid item xs={12} sm={8}
                    className={styles.topBannerChildGrid}
                    >
                        <div>
                        <Typography component="h1" variant={letSize} sx={{margin:"1rem auto"}}
                        className={styles.subTitleBanner}
                        >{obj.name}</Typography>
                        <Typography component="h1" variant={getWidth < 600 ? "h6":"h5"} sx={{margin:"auto"}}>{obj.desc}</Typography>
                        </div>
                    </ChildGrid>
                    </Grid>
            
            ))
        :
        <div><h3>loading...</h3></div>
        }
        

        </CustTopBanner>
        </Container>
  )
}

export default TopBanner