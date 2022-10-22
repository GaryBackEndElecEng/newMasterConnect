import React, { useEffect, useContext, } from 'react';
import { useLocation } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import PagesIcon from '@mui/icons-material/Pages';
import api from '../axios/api';

const GetRegisterPages = () => {
    const location = useLocation();
    const pathName = location.pathname;
    const theme = useTheme();
    const { registerPage, setHits,hits, setRegisterPage } = useContext(GeneralContext);

    useEffect(()=>{
        const getRegisteredPages = async()=>{
          try {
            const res = await api.get('/pageCountGet/');
            const body=res.data
            setRegisterPage({loaded:true,data:body})
          } catch (error) {
            console.error(error.message)
          }
        }
        getRegisteredPages();
      },[])


    useEffect(() => {
        setTimeout(() => {
            if (registerPage.loaded) {
                let obj = registerPage.data.filter(obj => (obj.page === pathName))[0]
                if(obj){
                setHits({ loaded: true, data: obj.pageCount })
                }
                // console.log("obj.page", obj.page, "pathname", pathName)
            }
        }, 400);
    }, [pathName,registerPage.loaded,registerPage.data]);


    return (
        <></>
    )
}

export default GetRegisterPages