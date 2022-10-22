import React from 'react';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import DiamondIcon from '@mui/icons-material/Diamond';
import LivingIcon from '@mui/icons-material/Living';
import RocketIcon from '@mui/icons-material/Rocket';
import YardIcon from '@mui/icons-material/Yard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SpaIcon from '@mui/icons-material/Spa';
import { Box } from '@mui/material';
import styled from 'styled-components';

const ElevateIcon = styled(Box).attrs({className: 'ElevateIcon'})`

animation:${({hover})=>(hover===true ? "rotateIcon 0.5s ease-in;":null)};
@keyframes rotateIcon {
  from { 
    transform:rotate(360deg);
    color:red;
  }
  to {
    transform:rotate(0deg);
    color:red;
  }
}
`;

const DesignIcon = ({id,hover}) => {
  
    const iconArr=[<HolidayVillageIcon/>,<DiamondIcon/>,<LivingIcon/>,<RocketIcon/>,<YardIcon/>,<StorefrontIcon/>,<SpaIcon/>]
    
  return (
    <ElevateIcon hover={hover}  sx={{marginLeft:"5px"}}>
    {iconArr[id] ? iconArr[id]
    
    : <></>}
    </ElevateIcon>
  )
}

export default DesignIcon