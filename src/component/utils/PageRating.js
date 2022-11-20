import React,{useContext,useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {GeneralContext} from '../../context/GeneralContextProvider';

const PageRating = () => {
const location=useLocation();
const pathname=location.pathname
const {pageRatings,setAverage}=useContext(GeneralContext);
useEffect(()=>{
if(pageRatings.loaded && pageRatings.data){
    let arr=pageRatings.data.filter(obj=>(obj.page === pathname));
    if(arr.length>0){
    setAverage(arr[arr.length-1].average)
    }
}
},[pageRatings.loaded,pageRatings.data,pathname,setAverage]);

  return (
    <></>
  )
}

export default PageRating