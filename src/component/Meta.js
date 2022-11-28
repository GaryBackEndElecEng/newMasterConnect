import React,{useEffect,useContext} from 'react';
import {GeneralContext} from '../context/GeneralContextProvider';

export const GetLocation = () => {
    const {setGetPathLocation}=useContext(GeneralContext);
    useEffect(()=>{
        let test= window.location.origin
        setGetPathLocation({loaded:true,data:test})
        localStorage.setItem("setLocation",test)
    },[setGetPathLocation]);

}

