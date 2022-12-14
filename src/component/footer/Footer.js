import React from 'react';
import {  Paper, Stack, } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import MediaIcons from './MediaIcons';
import Location from './Location';
import styles from './footer.module.css';
import NavLinks from './NavLinks';
import Faqs from './Faqs';
import Sponsors from './Sponsors';
import Profile from './Profile';

const Footer = () => {
  const theme = useTheme();
 


  
  return (
    <footer style={{ maxWidth: "100vw", marginTop: "1rem" }} className={styles.footer}>
      
      <Faqs/>
      <Paper
        sx={{ boxShadow: `3px 3px ${theme.palette.common.medium}`, background: theme.palette.footer.lighter }}>
        <NavLinks/>
      </Paper>
      <Sponsors/>
      <Stack direction={{xs:"column"}} sx={{margin:"1rem auto"}} >
      <Profile/>
      <Location />
      </Stack>
      <MediaIcons />
    </footer>
  )
}

export default Footer