import React, {  useState,useContext,useEffect } from 'react';
import { Stack, Box, Switch, Typography} from '@mui/material';
import {GeneralContext} from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import CoverPage from './CoverPage';
import styled from 'styled-components';
import Design9Helmet from './Design9Helmet';
import styles from './design9.module.css'
import {useTheme} from '@mui/material/styles';
import Projects from './Projects';
import thisArray from './realstateArr.json';
import frenchArray from './realstateArrFr.json';



const CustomBox = styled(Box)`
margin:auto;
margin-top:5px;
width:100vw;
position:relative;
background-color:${({bg})=>bg};
animation: smoothIn 1s ease-in-out;
@keyframes smoothIn {
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:600px){
  margin-top:-55px;
}
`;

const Design9 = () => {
    const theme=useTheme();
    const {setTitle, setStyleName,setChangePage,staticImage}=useContext(GeneralContext);
    const {getProductList}=useContext(PriceContext);
    const [frenchEnglish,setFrenchEnglish]=useState({language:thisArray});
    const [turnOn,setTurnedOn]=useState(false);
    const [summary, setSummary] = useState(false);
    const [desc, setDesc] = useState(false);
    const [keywords, setKeywords] = useState(false);
    const [image, setimage] = useState(false);
    const [OBJ, setOBJ] = useState(false);

    useEffect(()=>{
      setTitle("Realtor");
      setStyleName("Realtor Page");
      setChangePage(false);
    },[]);

    useEffect(()=>{
      if(getProductList.loaded && getProductList.data){
          let obj=getProductList.data.filter(obj=>(obj.name==="Realstate"))[0];
          let kewds=obj.desc.split(" ")
          .filter(wd=>(wd !=="the"))
          .filter(wd=>(wd !=="This"))
          .filter((wd)=>(wd !=="a"))
          .filter(wd=>(wd !=="for"))
          .filter(wd=>(wd !=="in"))
          .filter(wd=>(wd !=="is"))
          .filter(wd=>(wd !=="of"))
          .filter(wd=>(wd !=="are"))
          .filter(wd=>(wd !=="and"))
          setSummary(obj.summary);
          setDesc(obj.desc);
          setKeywords(kewds);
          setimage(`${staticImage}/${obj.imageName}`);
          setOBJ(obj)
      }
      if(window.scrollY){
          window.scroll(0,0);
          
      }
  },[getProductList.loaded,getProductList.data,staticImage]);

    const checkedOn =(e)=>{
      setTurnedOn(e.target.checked)
      if(e.target.checked===true){
        setFrenchEnglish({language:frenchArray});
      }
      if(e.target.checked===false){
        setFrenchEnglish({language:thisArray})
      }
    }
  return (
    <CustomBox bg={theme.palette.common.lighter}>
      <Design9Helmet summary={summary} desc={desc} image={image} keywords={keywords} OBJ={OBJ} />
      <Stack direction="row"
      sx={{justifyContent:"center",alignItems:"center",position:"absolute",right:"7%",top:{md:"3.5%",xs:"0%"},zIndex:"1000",background:theme.palette.common.fadeCharcoal,padding:{md:"0.5rem",xs:"0.25rem"},color:"white"}}
      >
        {turnOn ===true ? 
        <Typography component="h1" variant="h5">to english</Typography> 
        : 
        <Typography component="h1" variant="h5">en francais</Typography>  
      }
      <Switch checked={turnOn} onChange={(e)=>checkedOn(e)}/>
      </Stack>
        <CoverPage  />
<Projects language={frenchEnglish.language} turnOn={turnOn}/>

    </CustomBox>
  )
}

export default Design9