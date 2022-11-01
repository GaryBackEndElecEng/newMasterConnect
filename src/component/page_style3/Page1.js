import React, { useEffect, useContext, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import ImagesContainer from './ImagesContainer';
import { GeneralContext } from '../../context/GeneralContextProvider.js';
import { useTheme } from '@mui/material/styles';
import ModalContainer from '../utils/ModalContainer';
import UserSignedInPurchaseBtn from '../utils/UserSignedInPurchaseBtn';
import RegisterPage from '../RegisterPage';
import PageFeedback from '../utils/PageFeedback';
import GetRegisterPages from '../utils/GetRegisterPages';


const Page1 = () => {
 
  const { setTitle, setStyleName,workArr ,setChangePage} = useContext(GeneralContext);
  const [showPurchaseBtn,setShowPurchaseBtn]=useState(false);

  useEffect(() => {
    const title1=workArr.filter(obj=>(obj.id===2))[0].title
    setTitle(title1);
    setStyleName("Style 3");
    setChangePage(false);;
    if(window.scrollY){
      window.scroll(0,0);
      
  }
  }, [setTitle, setStyleName]);

  
  useEffect(()=>{
    const getUser_id=localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")):null;
    if(getUser_id){
        setShowPurchaseBtn(true);
    }
},[])

  return (
    <>
    <GetRegisterPages/>
    <div className="container-fluid" style={{ posistion: "relative", width: "100vw", display: "flex", justifyContent: "flex-start", alignItems: "center",flexDirection:"column" }}>
      <RegisterPage/>
      <ImagesContainer />
    </div>
    <Container maxWidth="xs">
    <Stack direction="column" sx={{ margin: "1rem auto" }}>
      { showPurchaseBtn ? <UserSignedInPurchaseBtn />
      :

      <ModalContainer />}
    </Stack>
    <Typography component="h1" variant="h5" sx={{textAlign:"center",margin:"1rem auto"}}>Please comment on the design,below. We strive to improve.</Typography>
        <PageFeedback/>
  </Container>
  </>

  )
}

export default Page1