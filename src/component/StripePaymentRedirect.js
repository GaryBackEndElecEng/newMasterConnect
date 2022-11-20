import React, {useEffect,useContext,} from 'react';
import {useNavigate,useLocation} from 'react-router-dom';
import QueryString from "query-string";
import { GeneralContext } from '../context/GeneralContextProvider';
//THIS SHOULD BE THE MAIN RETURN FROM STRIPE IT REDIRECTS THE TO SUCCESS AND OR CANCELED
// const query = new URLSearchParams(window.location.search);
// const values = location.search;
// const location=useLocation();

const StripePaymentRedirect = () => {
  const navigate=useNavigate();
  // const {showCheckout,user_id,loggedIn } = useContext(TokenAccessContext);
  const { setChangePage,setIsCheckoutSuccess,setSession_id,setPostSession_id,setExtraSession_id, } = useContext(GeneralContext);
  const location=useLocation();
  const values=QueryString.parse(location.search)
 

    useEffect(()=>{
      
      if(values){
        setIsCheckoutSuccess(true)
        if(values.session_id){
        setSession_id(values.session_id);
        localStorage.setItem("session_id",values.session_id)
        navigate("MyAccount/success",setChangePage(true))
        }
        if(values.postSession_id){
          setPostSession_id(values.postSession_id);
          localStorage.setItem("postSession_id",values.postSession_id)
          navigate("MyAccount/SuccessPost",setChangePage(true))
        }
        if(values.sessionExtra_id){
          setExtraSession_id(values.sessionExtra_id);
          localStorage.setItem("extraSession_id",values.sessionExtra_id)
          navigate("MyAccount/SuccessExtra",setChangePage(true))

        }
        
      }
      if(values.canceled){
        setIsCheckoutSuccess(false)
        navigate("MyAccount/canceled",setChangePage(true))
      }
    },[values,setChangePage,setIsCheckoutSuccess,setSession_id,setExtraSession_id,setPostSession_id,navigate]);
  return (
    <></>
  )
}

export default StripePaymentRedirect