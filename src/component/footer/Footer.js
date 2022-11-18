import React,{useContext} from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {  Paper, Stack, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PageRatings from './PageRatings';
import MediaIcons from './MediaIcons';
import Location from './Location';
import styles from './footer.module.css';
import NavLinks from './NavLinks';
import Faqs from './Faqs';
import Sponsors from './Sponsors';
import Profile from './Profile';

const Footer = () => {
  const theme = useTheme();
  const {sponsor}=useContext(GeneralContext);
 
  
  return (
    <footer 
    style={{
      width: "100vw", marginTop: "1rem",zIndex:"100000",background:"white"
     }}
     className={styles.footer}>
      
      <Faqs/>
      <Paper
        sx={{ boxShadow: `3px 3px ${theme.palette.common.medium}`, background: theme.palette.footer.lighter }}>
        <NavLinks/>
      </Paper>
      <PageRatings/>
      {sponsor.loaded && <Sponsors/>}
      <Stack direction={{xs:"column"}} sx={{margin:"1rem auto"}} >
      <Profile/>
      <Location />
      </Stack>
      <MediaIcons />
    </footer>
  )
}

export default Footer