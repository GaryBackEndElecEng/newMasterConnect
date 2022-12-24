import React,{useContext,useEffect,useState} from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {useTheme} from '@mui/material/styles';
import styled from 'styled-components';
import {Stack,Card,CardMedia,Typography,Box} from '@mui/material';
import CoverPage from './CoverPage';


const Solarmain=styled.div`
width:100vw;
margin:0;
margin-top:5px;
position:relative;

@media screen and (max-width:900px){
  margin-top:-5px;
}
@media screen and (max-width:800px){
  margin-top:-5px;
}
@media screen and (max-width:600px){
  margin-top:-55px;
}
`;
const SolarPanel = () => {
  const theme=useTheme();
  const {staticImage,setTitle,setStyleName}=useContext(GeneralContext);
  const [getArray,setGetArray]=useState([]);
  useEffect(()=>{
    setTitle("Solar Store");
    setStyleName("Tommorrows way");
  },[])
  useEffect(()=>{
    const arrPhotos=[
      {id:0,title:"Solar-kit",image:"solar1.png",summary:"Solar kit for the home owner"},
      {id:1,title:"Composite",image:"solar2.png",summary:"mult-layer composite technology"},
      {id:2,title:"79% energy capture",image:"solar3.png",summary:"30% parabula fit for continued sun capture from sunrise to dusk"},
      {id:3,title:"800 WATT Kit",image:"solar4.png",summary:"1500-3000W static converters,Water/weatherproof junction box with lock-connects,water/weatherproof TCP/IP reader and GW4 100ft cables "},
      {id:4,title:"mult-fit assembly",image:"solar5.png",summary:"easy assembly perspect "},
      {id:5,title:"Parabolic solar-panel",image:"solar6.png",summary:"no servo-static installation solar panels with anti-stick water/ice glass index"},
      {id:6,title:"Effective Solar Use",image:"solar7.png",summary:"Multi-uses to recapture the power of our sun in a battery"},
      {id:7,title:"cause-and-effect",image:"solar8.png",summary:"continual charge while camping to garranteed power in comfort"},
      {id:8,title:"cause-and-effect",image:"solar9.png",summary:"Power for marin devises when at dock or out in the ocean. Having power when you your life depends on it."},
  ]
    setGetArray(arrPhotos);
  },[setGetArray]);
  return (
    <Solarmain
    >
      <CoverPage staticImage={staticImage} getArray={getArray ? getArray:null}/>

    </Solarmain>
  )
}

export default SolarPanel