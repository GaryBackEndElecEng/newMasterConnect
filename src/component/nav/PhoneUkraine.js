import React from 'react'
import styled from 'styled-components';
import {Stack,Container} from '@mui/material';
import Ukraine from './Ukraine';
import PhoneApp from './PhoneApp';

const StackCust=styled(Stack)`
margin:auto;
justify-content:center;
align-items:center;
`;

const PhoneUkraine = () => {
  return (
    <Container maxWidth="sm">
    <StackCust direction={{xs:"column",sm:"row"}} spacing={{xs:1,sm:2}}>
        <Ukraine/>
        <PhoneApp/>
    </StackCust>
    </Container>
  )
}

export default PhoneUkraine