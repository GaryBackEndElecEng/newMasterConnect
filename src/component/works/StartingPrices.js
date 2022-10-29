import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

const CustStack = styled(Stack)`
position:absolute;
background:${({bg})=>bg};
color:white;
z-index:20;
top:20%;
width:100%;

animation:reveal 1s ease-in-out;
@keyframes reveal {
  from { opacity:0;transform:translateY(-40%) scale(0);}
  to { opacity:1;transform:translateY(0%) scale(1);}
}
@media screen and (max-width:600px){
  top:0%;
}
`;
const StartingPrices = ({ obj }) => {
  const theme = useTheme();
  
  return (
    <CustStack direction="column" spacing={{ xs: 0, sm: 1, md: 2 }}
    bg={theme.palette.common.orangeFade2}
    >
      <Typography component='h1' variant="h5" sx={{padding:"1rem"}}>
        {obj.summary}here
      </Typography>
    </CustStack>
  )
}

export default StartingPrices