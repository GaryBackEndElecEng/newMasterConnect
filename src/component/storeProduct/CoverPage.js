import React,{useEffect,useState,useContext} from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styled from 'styled-components';
import {Stack,Container,Typography,Grid} from '@mui/material';
import {useTheme} from '@mui/material/styles';


const MainCover=styled.div`
width:100vw;
background-image:url(${({bg_image})=>bg_image});
background-size:100% 135%;
background-color:${({bg})=>bg};
min-height:70vh;
position:relative;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
@media screen and (max-width:900px){
    min-height:40vh;
    background-size:100% 120%;
}
@media screen and (max-width:800px){
min-height:40vh;
    background-size:100% 120%;
}
@media screen and (max-width:600px){
min-height:40vh;
    background-size:100% 100%;
}
@media screen and (max-width:400px){
min-height:40vh;
    background-size:100% 100%;
}

`;
const CustStack=styled(Stack)`

position:absolute;
top:32%;
left:42%;
animation:appearIn 7s ease-in-out;
color:black;
z-index:1000;
@keyframes appearIn{
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:900px){
    top:87%;
left:5%;
color:white;


}

@media screen and (max-width:420px){
    top:75%;
    padding:0.5rem;
left:5%;
}
@media screen and (max-width:400px){
    top:75%;
    
left:2%;
}
`;
const CustStack2=styled(Stack)`

position:absolute;
top:10%;
left:43%;
animation:appearIn 3s ease-in-out;
color:blue;
z-index:1000;
@keyframes appearIn{
    from {opacity:0;}
    to {opacity:1;}
}
@media screen and (max-width:900px){
    top:30%;
left:42.5%;
color:black;


}
@media screen and (max-width:800px){
    top:28%;
left:42.5%;
color:black;


}

@media screen and (max-width:420px){
    top:22%;
    padding:0.5rem;
left:40%;
}
@media screen and (max-width:400px){
    top:22%;
    
left:38%;
}
`;
const CustTypo=styled(Typography)`

border-bottom:${({b_b})=>b_b};
border-top:${({b_b})=>b_b};
animation borderIn 2.5s ease-in-out;
transition:all 2.5s ease-in;
@keyframes borderIn {
    from {opacity:0;}
    to {opacity:1;}
}
`;
const CoverPage = () => {
    const theme=useTheme();
    const { staticImage}=useContext(GeneralContext);
    const prodLogo=`${staticImage}/storePage/mangraveLogo.png`;
    const [underline,setUnderLine]=useState(false);
    const getUnderline= (underline && window.innerWidth < 900) ? "2px solid white" :"2px solid black";
    useEffect(()=>{
        setTimeout(()=>{
            setUnderLine(true);
        },5000);
    },[]);
  return (
    <MainCover
    bg_image={prodLogo}
    bg={"black"}
    >
        <CustStack2 direction="column" spacing={{xs:1,sm:2}}
        
        >       
         <Typography component="h1" variant="h3"
         sx={{fontSize:{xs:"80%",sm:"150%",md:"300%"}}}
         > 
         4-in-1 grooming kit
         </Typography>
         </CustStack2>
        <CustStack direction="column" spacing={{xs:1,sm:2}}
        
        >       
         <CustTypo component="h1" variant="h2"
         b_b={underline ? getUnderline :"none"}
         sx={{fontSize:{xs:"180%",sm:"350%",md:"300%"}}}
         > 
         Made for Men who care
         </CustTypo>
         </CustStack>


    </MainCover>
  )
}

export default CoverPage