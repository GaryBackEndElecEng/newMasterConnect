import React from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styled from 'styled-components';
import { Stack, Typography } from '@mui/material';

const CustUkraine=styled.div`
margin:1rem auto;
position:relative;
padding-inline:1rem;
width:40%;
height:5vh;
display:flex;
justify-content:center;
align-items:center;
background-image:url(${({bgimage})=>bgimage});
background-size:100% 100%;
background-position:50% 50%;
@media screen and (max-width:900px){
  width:60%;
}
@media screen and (max-width:900px){
  width:100%;
}
`;
const CustStack= styled(Stack)`
margin:auto;
position:absolute;
justify-content:center;
align-items:center;
padding:0.5rem;
background:white;
top:-30%;
left:30%;
`;

const Ukraine = () => {
    const {staticImage}=React.useContext(GeneralContext);
    const ukrain=`${staticImage}/extra/ukrain.png`;
    

  return (
    <CustUkraine
    bgimage={ukrain}
    />
  )
}

export default Ukraine