import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContextProvider';
import api from './axios/api';

const RegisterPage = () => {
    const { setRegisterPage,registerPage } = useContext(GeneralContext);
    const location=useLocation();
    
    useEffect(()=>{
        const changePage = async ()=>{
          const params={"page":location.pathname}
          if(params.page){
            try {
              const res= await api.post('/pageCount/',params)
              const obj=res.data
              if(obj){
              setRegisterPage({loaded:true,data:[...registerPage.data,obj]})
              }else{
                setRegisterPage({loaded:false})
              }
            } catch (error) {
              console.error(error.message)
            }
        }
        }
        changePage();
      },[]);

  return (
    <></>
  )
}

export default RegisterPage