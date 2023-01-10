import React,{useContext,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {PriceContext} from '../../context/PriceContextProvider';
import styled from 'styled-components';
import {useTheme} from '@mui/material/styles';
import {Stack,Container,Typography,Card} from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from './home.module.css'
import { useEffect } from 'react';

const ItemCard = styled(Card)`
width:100%;
margin:auto;
background:${({bg})=>bg};
background-image:url(${({bg_image})=>bg_image});
background-size:100% 100%;
height:30vh;
position:relative;
padding:1rem;
cursor:pointer;
animation: growIn 1s ease-in-out;
@keyframes growIn {
    from {transform:translateX(-50%) scale(0);}
    to {transform:translateX(0%) scale(1);}
}
@media screen and (max-width:900px){
height:20vh;
background-size:100% 100%;
}
@media screen and (max-width:800px){
height:22vh;
}
@media screen and (max-width:900px){
height:39vh;
}
`;
const CustStack=styled(Stack)`
display:${({display})=>display};
position:absolute;
padding:1rem;
top:0%;
left:auto;
background:rgba(255, 255, 255,.5);
animation: slideIn1 2s ease-in-out;
@keyframes slideIn1 {
    from {transform:translateX(-50%);opacity:0;}
    to {transform:translateX(0%);opacity:1;}
    }
@media screen and (max-width:900px){
    left:0%;
    width:100%;
}
@media screen and (max-width:800px){

}
@media screen and (max-width:600px){

}

`;
const TopDesigns = ({makeEasy}) => {
    const theme=useTheme();
    const navigate=useNavigate();
    const {staticImage,setChangePage,getProductDesigns}=useContext(GeneralContext);
    const [turnOn,setTurnOn]=useState(false);
    const [turnOnDesc,setTurnOnDesc]=useState(false);
    const [getDesigns,setGetDesigns]=useState([]);

    useEffect(()=>{
        if(makeEasy===true){
            setTimeout(()=>{setTurnOn(true);},1500);
        }
        if(turnOn===true){
            setTimeout(()=>{setTurnOnDesc(true)},1500);
            
        }
    },[makeEasy,setTurnOn,turnOn])

    const handleNavigate=(e,link)=>{
        e.preventDefault();
        navigate(link,setChangePage(true))
    }
  
      useEffect(()=>{
        const designs = [
            { id: 0, name: "Wedding", link: "/design6", summary: "Elagent wedding design", icon: <CameraIcon sx={{mr:1,color:"red"}} />, pic: `${staticImage}/design7.png`, display: "none" },
            { id: 1, name: "Realstate", link: "/design9", summary: "A sharp realtor Specialist page", icon: <FavoriteIcon  sx={{mr:1,color:"red"}}/>, pic: `${staticImage}/design9.png`, display: "none" },
            { id: 2, name: "Interior Designer", link: "/design10", summary: "Beautiful Design Page", icon: <LocalFloristIcon  sx={{mr:1,color:"red"}}/>, pic: `${staticImage}/design10.png`, display: "none" },
          ]
        if(getProductDesigns.loaded){
            let arr=[];
            designs.forEach((obj,index)=>{
                let monthly=getProductDesigns.data.filter(ob=>(ob.name===obj.name))[0];
                arr.push({...obj,price:monthly.monthly});
            });
            setGetDesigns(arr);
            
        }
      },[getProductDesigns,setGetDesigns,staticImage]);
     
  return (
    <Container maxWidth="lg"
    sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:{md:"row",xs:"column"},minHeight:{xs:"30vh",sm:"20vh",md:"30vh"},position:"relative",marginBottom:"1rem"}}
    >
        { (turnOn && getDesigns) && getDesigns.map((obj,index)=>(
        <ItemCard 
        key={`${obj.id}-growIn-${index}`}
        bg_image={obj.pic}
        bg={theme.palette.common.lighter} elevation={3}
        sx={{position:"relative"}}
        onClick={(e)=>handleNavigate(e,obj.link)}
        >
            <CustStack direction="column" spacing={{xs:1,md:2}} display={turnOnDesc ? "block":"none"}>
            <Typography component="h1" variant="h3" >{obj.name}</Typography>
            <br/>
            <Typography component="h1" variant="h5" sx={{marginTop:"10rem"}}>{obj.summary}</Typography>
            <Typography component="h1" variant="h5" > ${obj.price}<sup>00</sup></Typography>
            </CustStack>

        </ItemCard>
        ))}
        
    </Container>
  )
}

export default TopDesigns