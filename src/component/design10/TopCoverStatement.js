import React from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styled from 'styled-components';
import {Stack} from "@mui/material";

const CustStack=styled(Stack)`
opacity:${({opacity})=>opacity};
margin:auto;
justify-content:center;
align-items:center;
position:absolute;
top:45%;
transition:opacity 1.5s ease-in-out;
@media screen and (max-width:600px){
    top:-0%;
}
@media screen and (max-width:380px){
    top:-0%;
}
`;

const CustTopStatement =styled.p`
opacity:${({opacity})=>opacity };
margin:0.5rem auto;
text-align:center;
color:white !important;
font-size:400%;
transition: opacity 1s ease-in-out;

@media screen and (max-width:900px){
    padding-inline:2rem;
    font-size:250%;
}
@media screen and (max-width:600px){
    font-size:150%;
}
`;
const CustTopStatement1 =styled.p`
margin:0.5rem auto;
text-align:center;
color:white !important;
font-size:400%;

@media screen and (max-width:900px){
    padding-inline:2rem;
    font-size:250%;
}
@media screen and (max-width:600px){
    font-size:150%;
}
`;
const TopCoverStatement = () => {
    const {design10Start}=React.useContext(GeneralContext);
    const [start2,setStart2]=React.useState(null);
    React.useEffect(()=>{
        if(design10Start){
            setTimeout(()=>{setStart2(true);},3500);
            
        }
    },[design10Start]);

  return (
    <CustStack direction="column"
    opacity={design10Start ? "1":"0"}
    
     >
    <CustTopStatement1
    >
        The comfort of Your Home Is What defines Your Peace. 
    </CustTopStatement1>
    <CustTopStatement
   
    opacity={start2 ? "1":"0"}
    >
        Master Designs provides you Peace-Of-Mind. 
    </CustTopStatement>
    </CustStack>
  )
}

export default TopCoverStatement