import React, { useContext, useEffect, useState,memo } from 'react'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
// import { PriceContext } from '../../context/PriceContextProvider';
import { useTheme } from '@mui/material/styles';
import { Container,Fab,Stack } from '@mui/material';
// import { ContainerHomeFluid } from '../../styled/Container.styled';
// import styles from './account.module.css';
// import styled from 'styled-components';
import apiProtect from '../axios/apiProtect';
import GetProductList from './GetProductList';
// import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import CoverPage from './CoverPage';
import Particulars from './Particulars';
import GetServiceList from './GetServiceList';
import AdditionalAfterPostService from './AdditionalAfterPostService';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import RegisterPage from '../RegisterPage';
import GetPage from './GetPage';
import GetRegisterPages from '../utils/GetRegisterPages';
import MyAccountHelmet from './MyAccountHelmet';
import ProductInfo from './ProductInfo';
import OrderFormBanner from './OrderFormBanner';
import GavelIcon from '@mui/icons-material/Gavel';
import api from '../axios/api';

const MyAccountMain=styled.div`
width:100%;
margin:0px;
`;

const MyAccount = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setSignin, setSignout, setGoToSignin,usersInvoice,usersPostInvoice,usersExtraInvoice,paid } = useContext(TokenAccessContext);
  const { setTitle, setStyleName, setLoggedIn,  setChangePage,setExtraServices,extraServices,productInfo,getPathLocation,setGetProductDesigns,getProductDesigns } = useContext(GeneralContext);
  const [activate, setActivate] = useState(false);
  const [postPaid, setPostPaid] = useState(false);
  const [invoice, setInvoice] = useState(false);
  const [postInvoice, setPostInvoice] = useState(false);
  const [extraInvoice, setExtraInvoice] = useState(null);
 
  const tokenIsValid = localStorage.getItem("tokenIsValid") ? JSON.parse(localStorage.getItem("tokenIsValid")) : false;
  //THIS REFRESHES THE  USERSPRODUCT FROM THE USER'S ACCOUNT TO REMOVE THE BUG ON REFRESH
  useEffect(() => {
    const getAllProductList= async ()=>{
      try {
        const res=await api.get('/account/product/');
        const products=res.data;
         let pageDesign=products.filter(obj=>(obj.type==="pageDesign"))
         if(pageDesign.length>0){
            setGetProductDesigns({loaded:true,data:pageDesign})
          localStorage.setItem("reducedProduct",JSON.stringify(pageDesign))
         }
      } catch (error) {
        console.error(error.message)
      }
    }
    getAllProductList();
},[]);
  

  useEffect(() => {
//THIS IS ONLY USED WHEN THE CLIENT LOGS IN, MAINLY FOR invoice.paid,postInvoice.paid triggers(CALL INFO FROM SERVER) 
    if (usersInvoice.loaded && usersInvoice.data) {
      if(usersInvoice.data.paid){
        //THIS SHOWS PRODUCT AND SERVICE LISTS BEFOR POST SERVICES
      setInvoice(usersInvoice.data)
      }
    }
    if (usersPostInvoice.loaded && usersPostInvoice.data) {
      if(usersPostInvoice.data.paid){
        //THIS SHOWS PAID POST SERVICES AND NOT PAID EXTRA SERVICES
        setPostPaid(true)
      setPostInvoice(usersPostInvoice.data)
      }
    }
    if (usersExtraInvoice.loaded && usersExtraInvoice.data) {
      // if(usersExtraInvoice.data.paid){
      setExtraInvoice(usersExtraInvoice.data)
      // }
    }
  }, [usersInvoice.loaded,usersInvoice.data,usersPostInvoice,usersExtraInvoice]);


  useEffect(() => {

    if (tokenIsValid) {
      setSignin(false);
      setActivate(true);
      setLoggedIn(true);
      
    }
    if(window.scrollY){
      window.scroll(0,0);
      
  }
  }, [tokenIsValid,setSignin,setActivate,setLoggedIn]);

  useEffect(()=>{
    const getExtraServices = async()=>{
      try {
        const res= await apiProtect.get('/account/extraServices/');
        const body= res.data;
        if(body.length>0){
        setExtraServices({loaded:true,data:body})
        }
      } catch (error) {
        console.error(error.message)
      }
    }
    if(postInvoice.paid){
    getExtraServices();
    }
  },[postInvoice,setExtraServices])


  useEffect(() => {
    setTitle("My Account");
    setStyleName("My Account");
    setChangePage(false);
    if(window.scrollY){
      window.scroll(0,0);
    }
  }, [setTitle, setStyleName,setChangePage]);

 
  const handleSignin = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('csrftoken');
    localStorage.removeItem('page');
    localStorage.removeItem("tokenIsValid");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("goToSignin");
    setSignout(true);
    setActivate(false);
    setLoggedIn(false);
    setGoToSignin(true);
    navigate("/signin", setChangePage(true))
  }
const handleContract=(e)=>{
  e.preventDefault();
  navigate("/MyAccount/contract", setChangePage(true));
}


  return (
    <MyAccountMain>
  
      {activate ?
        <>
        <MyAccountHelmet
        getPathLocation={getPathLocation.loaded ? getPathLocation.data:""}
        />
        <GetPage/>
        <RegisterPage/>
        <GetRegisterPages/>
          <CoverPage />
          <Particulars 
          invoicePaid={invoice ? invoice :usersInvoice.data}
           postInvoicePaid={postInvoice !== false ? postInvoice : null}
           extraInvoicePaid={extraInvoice && extraInvoice}
           />
          {( usersInvoice.data.paid) && <OrderFormBanner />}

         {!invoice  && !invoice.paid && <GetProductList getProductDesigns={getProductDesigns}/>}
          
            
          {!invoice && !invoice.paid &&<GetServiceList paid={invoice.paid} postPaid={postInvoice.paid} />}

         {postPaid && <AdditionalAfterPostService extraServices={extraServices}/> }
            
            {productInfo.loaded && <ProductInfo productInfo={productInfo} />}
            
         {paid && <Stack direction="column" spacing={{xs:0,sm:1,md:2}}
         sx={{alignItens:"center", margin:"1rem auto"}}
         >
          <Fab variant="extended" size="medium" color="info" onClick={(e)=>handleContract(e)}>
            agreement <GavelIcon sx={{ml:1,color:"red"}}/>
          </Fab>
         </Stack>}
        </>
        :
        <Container maxWidth="md" sx={{ textAlign: "center", margin: "3rem auto" }}>
          <Fab variant="extended" color="warning" sx={{ ml: 3 }} onClick={() => handleSignin()} >
            Go to Signin please
            <ExitToAppIcon sx={{ fontSize: "24px", color: theme.palette.secondary.dark, ml: 3 }} />
          </Fab>
        </Container>
      }
    </MyAccountMain>
  )
}


export default MyAccount