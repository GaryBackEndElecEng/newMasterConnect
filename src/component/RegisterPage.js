import React, { useContext, useEffect,useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContextProvider';
import api from './axios/api';

const RegisterPage = () => {
    const { setRegisterPage,registerPage } = useContext(GeneralContext);
    const location=useLocation();
    
    useEffect(()=>{
        const changePage = async ()=>{
          const params={"page":location.pathname}
          try {
            const res= await api.post('/pageCount/',params)
            const obj=res.data
            //sends back  "id","canceled(bool)","canceledCount(int)"
            setRegisterPage({loaded:true,data:[...registerPage.data,obj]})
          } catch (error) {
            Promise.reject("server is down")
          }
        }
        changePage();
      },[]);

  return (
    <></>
  )
}

export default RegisterPage