import React, { useContext, useEffect, useState, } from 'react';
import {useNavigate} from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import {  Grid, Container, Typography, Stack, Fab} from '@mui/material';
import SpecialCreatValueCard from './SpecialCreatValueCard';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
// import styles from "./home.module.css";



const SpecialContainer = styled(Container)`
margin:3rem auto;
background:${({ bg }) => bg};
background-image:url(${({ image }) => image});
background-size:100% 100%;
filter:contrast(120%);
min-height:20vh;
min-width:250px;
display:flex;
justify-content:flex-start;
position:relative;
align-items:center;
flex-direction:column;
box-shadow:1px 1px 18px 8px grey;

`;

//NOT USED- CHRIS SUGGESTION
const PointerImg = styled.img`
width:250px;
height:250px;
position:absolute;
left:-5%;
top:2%;
animation: swingIn 2.0s ease-in-out !important;
@keyframes swingIn {
  from { opacity:0;height:0px;}
  to {opacity:1;height:250px;}
}
@media screen and (max-width:900px){
  width:220px;
height:220px;
left:-8%;
top:0%;
@keyframes swingIn {
  from { opacity:0;height:0px;}
  to {opacity:1;height:220px;}
}
}
@media screen and (max-width:600px){
  width:110px;
height:110px;
left:-9%;
top:5%;
@keyframes swingIn {
  from { opacity:0;height:0px;}
  to {opacity:1;height:110px;}
}
}

`;

const SpecialCreateValue = () => {
  const navigate=useNavigate();
  const theme = useTheme();
  const [pointer, setPointer] = useState(false);
  const {  special,setChangePage } = useContext(GeneralContext);
  const { getPackages } = useContext(PriceContext);
  // const [getSpecials,setGetSpecials]=useState({loaded:false,data:[]});
  const [removeSpecial,setRemoveSpecial]=useState(false);
  const [getSpecials, setGetSpecials] = useState({ loaded: false, data: [] });
  // const pointerImg = `${staticImage}/pointer2.png`;
  // const colorWorld = `${staticImage}/newColorWorld.png`;
  const vacationPic = "https://new-master.s3.ca-central-1.amazonaws.com/static/vacationPic.JPG";
  const getSpecial = special.loaded ? special.data : null;
  // const get_packages = getPackages.loaded ? getPackages.data : null;


  useEffect(()=>{
    const getFilterAwait= async ()=>{
    try {
      const filterSpecials= await getPackages.data.filter(obj=>(JSON.parse(obj.specialOffer)===true));
      const filterSpecials1=filterSpecials
      if(filterSpecials1){
      setGetSpecials({ loaded: true, data: filterSpecials1 })
      }else{setRemoveSpecial(true);setGetSpecials({loaded:false})}
    } catch (error) {
      setRemoveSpecial(true);setGetSpecials({loaded:false})
    }
      
  
  }
  if(getPackages.loaded && getPackages?.data.length>0){
    getFilterAwait();
  }
  },[getPackages.loaded,getPackages.data,setGetSpecials,setRemoveSpecial]);


  const observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setPointer(true)
      } else {
        setTimeout(() => {
          setPointer(false)
        }, 0);
      }
    });
  }, { threshold: 1 });

  const handleObserver = (e) => {
    if (e) {
      observer2.observe(e)
    }
  }
  const handleGoToPackages =(e)=>{
    e.preventDefault();
    navigate("/packages",setChangePage(true))
  }
 
  return (
    <>
    { (!removeSpecial && getPackages?.data) &&
    
    <SpecialContainer
      maxWidth={"xl"}
      ref={(e) => handleObserver(e)}
      bg={theme.palette.common.light}
      image={vacationPic}
    >
      <Typography component="h1" variant="h3" key={`${Math.ceil(Math.random()*1000)}`}
        sx={{
          textAlign: "center", margin: "0.5rem auto", color: "white"
        }}>
        {getSpecial && getSpecial.title}
      </Typography>
      <Stack direction="column" spacing={1} sx={{margin:"1rem auto",alignItems:"center"}}
      onClick={(e)=>handleGoToPackages(e)}
      >
        <Fab variant="extended" color="info" size="small" sx={{padding:"0.5rem 1rem"}}>
          see packages
        </Fab>
      </Stack>
    <Grid container spacing={{ md: 2, xs: 0 }}
        sx={{ minHeight: "22vh", display: "flex", justifyContent: "center", alignItems: "flex-start", margin: "1rem auto", padding: "5px", maxHeight: "45vh", overflowY: "scroll" }}
      >
          <SpecialCreatValueCard pointer={pointer} getSpecials={getSpecials} key={`${Math.ceil(Math.random()*10000)}-${0}`}/>

      </Grid>
      {/* {pointer && <PointerImg src={pointerImg} alt="www.master-connect.ca" />} */}
    </SpecialContainer>

    }
    </>
  )
}

export default SpecialCreateValue



