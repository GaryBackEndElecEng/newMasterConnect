import React, { useEffect, useContext, } from 'react';
import { useLocation } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContextProvider';
import api from '../axios/api';

const GetRegisterPages = () => {
    const location = useLocation();
    const pathName = location.pathname ? location.pathname : null;
    
    const { registerPage, setHits, } = useContext(GeneralContext);


    useEffect(() => {
      const getPages = async ()=>{
        try {
              
              let obj = registerPage.data.filter(obj => (obj.page === pathName))[0]
              if(obj){
                // console.log("obj.page", obj.page,"INSIDE","pageCount",obj.pageCount)
              setHits({ loaded: true, data: obj.pageCount })
              }else{setHits({loaded:false})}
          
        } catch (error) {
          setHits({loaded:false})
        }
        
      }
      if(pathName && registerPage.loaded){
        getPages();
      }
    }, []);


    return (
        <></>
    )
}

export default GetRegisterPages