import React from 'react';
import {useTheme} from '@mui/material/styles'
import { Box } from '@mui/material';

const Miscel = () => {
    const theme=useTheme();
  return (
    <Box sx={{background:theme.status.danger}}>The site has Not been found</Box>
  )
}

export default Miscel