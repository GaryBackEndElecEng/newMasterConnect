import React,{useContext,useState} from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {  Fab, Paper, Stack, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PageRatings from './PageRatings';
import MediaIcons from './MediaIcons';
import Location from './Location';
import styles from './footer.module.css';
import NavLinks from './NavLinks';
import Faqs from './Faqs';
import Sponsors from './Sponsors';
import Profile from './Profile';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Footer = () => {
  const theme = useTheme();
  const {sponsor}=useContext(GeneralContext);
  const [showReview,setShowReviews]=useState(false);
  const windowxs=window.innerWidth < 600 ? true:false;
 
  const handleShowReviews=(e)=>{
    e.preventDefault();
    if(!showReview){
      setShowReviews(true);
    }else{
      setShowReviews(false)
    }
  }
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
      <Stack direction="column" spacing={0} sx={{alignItems:"center",width:"100%"}}
      className={!showReview ? styles.hideReviewBtn : styles.showReviewBtn}
      >
        <Fab variant="extended" size={windowxs ? "small":"large"} color={!showReview? "info": "secondary"}
        onClick={(e)=>handleShowReviews(e)}
        
        >
          {showReview ? <>Hide reviews <ExpandMoreIcon sx={{ml:1,color:"black",fontSize:"250%"}}/> </>:<>Show Reviews  <ExpandLessIcon sx={{ml:1,color:"white",fontSize:"250%"}}/></>}
        </Fab>
      </Stack>

      {showReview && <PageRatings/>}
      {sponsor.loaded && <Sponsors sponsor={sponsor.data}/>}
      <Stack direction={{xs:"column"}} sx={{margin:"1rem auto"}} >
      <Profile/>
      <Location />
      </Stack>
      <MediaIcons />
    </footer>
  )
}

export default Footer