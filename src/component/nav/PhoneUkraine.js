import React from 'react'
import styled from 'styled-components';
import {Stack,Container,Fab} from '@mui/material';
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
  

  const handleUltils=(e)=>{
    e.preventDefault();
    window.open("https://www.masterultils.com")
  }
  return (
    <Container maxWidth="sm">
    <StackCust direction={{xs:"column",sm:"row"}} spacing={{xs:1,sm:2,md:5}}>
      <Fab size="large" color="primary" variant="extended" 
        onClick={(e)=>handleUltils(e)}
      >free tools</Fab>
        <Ukraine/>
        <PhoneApp/>
    </StackCust>
    </Container>
  )
}

export default PhoneUkraine