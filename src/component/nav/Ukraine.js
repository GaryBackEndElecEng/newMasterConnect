import React from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import styled from 'styled-components';
import { Stack, Typography } from '@mui/material';

const CustUkraine=styled.div`
margin:2rem auto;
padding-inline:1rem;
width:100%;
height:10vh;
display:flex;
justify-content:center;
align-items:center;
background-image:url(${({bgimage})=>bgimage});
background-size:100% 100%;
background-position:50% 50%;
`;
const CustStack= styled(Stack)`
margin:auto;
justify-content:center;
align-items:center;
padding:0.5rem;
background:white;
`;

const Ukraine = () => {
    const {staticImage}=React.useContext(GeneralContext);
    const ukrain=`${staticImage}/extra/ukrain.png`;
    const fontSize= window.innerWidth < 900 ? (window.innerWidth < 600 ? "h5" :"h4"):"h3";

  return (
    <CustUkraine
    bgimage={ukrain}
    >
        <CustStack direction="row" spacing={2}>
            <Typography component="h2" variant={fontSize}> живе! </Typography>
            <Typography component="h2" variant={fontSize}> long live! </Typography>
            <Typography component="h2" variant={fontSize}> Ukraine </Typography>
        </CustStack>
    </CustUkraine>
  )
}

export default Ukraine