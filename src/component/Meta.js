import React,{useEffect,useContext} from 'react';
import {GeneralContext} from '../context/GeneralContextProvider';

export const GetLocation = () => {
    const {setGetPathLocation}=useContext(GeneralContext);
    useEffect(()=>{
        let test= window.location.href
        setGetPathLocation({loaded:true,data:test})
    },[setGetPathLocation]);

}

