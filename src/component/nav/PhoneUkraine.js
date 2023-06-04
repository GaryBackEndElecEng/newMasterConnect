import React from 'react'
import styled from 'styled-components';
import {Stack,Container} from '@mui/material';
import Ukraine from './Ukraine';
import PhoneApp from './PhoneApp';

const StackCust=styled(Stack)`
margin:auto;
justify-content:center;
align-items:center;
wdth:60%;
@media screen and (max-width:900px){
width:50%;
}
@media screen and (max-width:600px){
width:40%;
}
`;

const PhoneUkraine = () => {
  return (
    <Container maxWidth="sm">
    <StackCust direction={{xs:"column",sm:"row"}} spacing={{xs:1,sm:2,md:5}}>
        <Ukraine/>
        <PhoneApp/>
    </StackCust>
    </Container>
  )
}

export default PhoneUkraine