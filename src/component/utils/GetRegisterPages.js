import React, { useEffect, useContext, } from 'react';
import { useLocation } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import api from '../axios/api';

const GetRegisterPages = () => {
    const location = useLocation();
    const pathName = location.pathname ? location.pathname : null;
    
    const { registerPage, setHits, setRegisterPage } = useContext(GeneralContext);

    useEffect(()=>{
        const getRegisteredPages = async()=>{
          try {
            const res = await api.get('/pageCountGet/');
            const body=res.data
            if(body && body?.length>0){
            setRegisterPage({loaded:true,data:body})
            }else{setRegisterPage({loaded:false})}
          } catch (error) {
            console.error(error.message)
          }
        }
        getRegisteredPages();
      },[])


    useEffect(() => {
        setTimeout(() => {
            if (registerPage?.loaded && registerPage?.data && pathName) {
                let obj = registerPage.data.filter(obj => (obj.page === pathName))[0]
                if(obj){
                setHits({ loaded: true, data: obj.pageCount })
                }else{setHits({loaded:false})}
                // console.log("obj.page", obj.page, "pathname", pathName)
            }
        }, 400);
    }, [pathName,registerPage.loaded,registerPage.data,setHits]);


    return (
        <></>
    )
}

export default GetRegisterPages