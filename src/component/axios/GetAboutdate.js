import React, { useContext, useEffect, useState, useRef } from 'react'
import { GeneralContext } from '../../context/GeneralContextProvider';
import api from './api';
const GetAboutdate = async () => {
   const {setAboutData } = useContext(GeneralContext);
 try {
    const res = await api.get(`/about`)
    const data= await res.data
    return setAboutData({data:data,loaded:true})
 } catch (error) {
    console.error(error.message)
    
 }
}

export default GetAboutdate