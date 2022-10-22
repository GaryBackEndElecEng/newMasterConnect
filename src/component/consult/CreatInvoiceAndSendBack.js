import React ,{useContext,useEffect,useMemo,useState} from 'react';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import apiProtect from '../axios/apiProtect';

const CreatInvoiceAndSendBack = () => {
    const {setUsersInvoice,user_id,setUser_id,setUserAccount,setUsersProduct,setUsersService,loggedIn,setLoggedIn}=useContext(TokenAccessContext);
    const getUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")):user_id;
    const getLoggedIn = localStorage.getItem("loggedIn") ? JSON.parse(localStorage.getItem("loggedIn")):loggedIn;

    useEffect(()=>{
        const createInvoice = async ()=>{
            const params={user_id:user_id,consult:true}
            try {
                const res= await apiProtect.post('/account/UserCombinedProductServicesConsultCheckPost/',params);
                //GETS ALL USERS ACCOUNTS AFTER CREATING THE INVOICE ACCOUNT
                const body= res.data
                setUserAccount({loaded:true,data:body});
                setUsersInvoice({loaded:true,data:body.invoice});
                setUsersService({loaded:true,data:body.service});
                setUsersProduct({loaded:true,data:body.product});
                setUser_id(getUser_id);
                setLoggedIn(loggedIn);
            } catch (error) {
                console.error(error.message)
            }
        }
        if(loggedIn && getUser_id){
            createInvoice();
        }
    },[loggedIn]);

  return (
    <></>
  )
}

export default CreatInvoiceAndSendBack