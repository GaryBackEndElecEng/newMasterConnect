import React,{useState,useRef, useEffect} from 'react';
import api from '../component/axios/api';

export const PriceContext=React.createContext();
export const PriceContextProvider = (props) => {
    const initializePricecatelog={
        data:null,
        loaded:false
    }
    Object.freeze(initializePricecatelog);
    const [priceCatelog,setPriceCatelog]=useState(initializePricecatelog);
    const [getServerPrice,setGetServerPrice]=useState(initializePricecatelog);
    const [getProductList,setGetProductList]=useState(initializePricecatelog);
    const [getServiceList,setGetServiceList]=useState(initializePricecatelog);
    const [getBaseFeatureList,setGetBaseFeatureList]=useState(initializePricecatelog);
    const [getBaseGeneralPrice,setGetBaseGeneralPrice]=useState(initializePricecatelog);
    const[postService,setPostService]=useState(initializePricecatelog);
    const [getPackages,setGetPackages]=useState({loaded:false,data:[]});
    const [getServices,setGetServices]=useState({loaded:false,data:[]});
    const [getProducts,setGetProducts]=useState({loaded:false,data:[]});
    const [getExtraServices,setGetExtraServices]=useState({loaded:false,data:[]});
    const [DNS,setDNS]=useState({loaded:false,data:[]});
    const [basePrice,setBasePrice]=useState({loaded:false,data:[]});
    const [startingPrices,setStartingPrices]=useState({loaded:false,data:[]});
    const [baseServices,setBaseServices]=useState({loaded:false,data:[]});
    const [serviceImage,setServiceImage]=useState({loaded:false,data:[]});
    const [userAccountGroup,setUserAccountGroup]=useState({loaded:false,data:[]});
    const [userAccountPostGroup,setUserAccountPostGroup]=useState({loaded:false,data:[]});
    const [SEO,setSEO]=useState({loaded:false,data:[]});
    
    useEffect(()=>{
        const getPricecatelog= async ()=>{
            try {
                const res= await api.get('account/priceCatelog/');
                const body=res.data;
                setPriceCatelog({loaded:true,data:body})
                //setGetBaseGeneralPrice=>product[],service[],postService{},extraService[]
                setGetBaseGeneralPrice({loaded:true,data:body.filter(obj=>(obj.name ==="basePrice"))[0]});
                //setGetBaseFeatureList=> empty
                setGetBaseFeatureList({loaded:true,data:body.filter(obj=>(obj.id===2))[0].price});
                //setGetProductList
                setGetProductList({loaded:true,data:body.filter(obj=>(obj.name==="Products"))[0].product});
                //setGetServiceList=>service[],postService[]
                setGetServiceList({loaded:true,data:body.filter(obj=>(obj.name==="Service"))[0].service});
                //setPostService
                setPostService({loaded:true,data:body.filter(obj=>(obj.name==="Post Service"))[0].postService});
                //setBasePrice=>product[],service[],postService[],extraService[]
                setBasePrice({loaded:true,data:body.filter(obj=>(obj.name==="basePrice"))[0]});
                setStartingPrices({loaded:true,data:body.filter(obj=>(obj.name==="baseServices_4"))[0].price});
                setGetExtraServices({loaded:true,data:body.filter(obj=>(obj.name==="extra Services"))[0].extraService});
                setDNS({loaded:true,data:body.filter(obj=>(obj.name==="DNS"))[0].service});
                setServiceImage({loaded:true,data:body.filter(obj=>(obj.name==="image"))[0].service});
                setUserAccountGroup({loaded:true,data:body.filter(obj=>(obj.name === "user Account"))[0].service});
                setUserAccountPostGroup({loaded:true,data:body.filter(obj=>(obj.name === "user Account"))[0].postService});
                setSEO({loaded:true,data:body.filter(obj=>(obj.name === "SEO"))[0].postService});

                localStorage.setItem("getServiceList2",JSON.stringify(body.filter(obj=>(obj.name==="Service"))[0].service));
                localStorage.setItem("getProductList2",JSON.stringify(body.filter(obj=>(obj.name==="Products"))[0].product));
            } catch (error) {
                console.error(error.message)
                
            }
        }
        getPricecatelog();
    },[]);

    useEffect(()=>{
      if(basePrice.loaded){
        let serviceArr=[],service2Arr=[],service3Arr=[],service4Arr=[];
        service4Arr=basePrice.data.service;
        service2Arr=basePrice.data.postService;
        service3Arr=basePrice.data.extraService;
        let returnArr = serviceArr.concat(service2Arr,service3Arr,service4Arr)
        setBaseServices({loaded:true,data:returnArr})

      }
    },[basePrice.loaded,basePrice.data]);

    useEffect(()=>{
        const getPackages= async ()=>{
            try {
                const res= await api.get('account/getPackages/');
                const body=res.data;
                if(body.length >0){
                setGetPackages({loaded:true,data:body})
                localStorage.setItem("getPackages",JSON.stringify(body))
                }
                
            } catch (error) {
                console.error(error.message)
                
            }
        }
        getPackages();
    },[]);

    useEffect(()=>{
        const getServices = async ()=>{
          try {
            const res= await api.get('/GetServices/');
            const body=res.data
            if(body.length>0){
            setGetServices({loaded:true,data:body})
            }
          } catch (error) {
            console.error(error.message)
          }
        }
        getServices();
      },[]);

    useEffect(()=>{
        const getProducts = async ()=>{
          try {
            const res= await api.get('/GetProducts/');
            const body=res.data
            if(body.length>0){
            setGetProducts({loaded:true,data:body})
            }
          } catch (error) {
            console.error(error.message)
          }
        }
        getProducts();
      },[])
    
    return (
        <PriceContext.Provider value={{priceCatelog,getServerPrice,setGetServerPrice,getProductList,getServiceList,getBaseFeatureList,getBaseGeneralPrice,getPackages,setGetPackages,getServices,getProducts,postService,basePrice,baseServices,startingPrices,getExtraServices,setGetExtraServices,setBasePrice,DNS,serviceImage,userAccountGroup,SEO,userAccountPostGroup}}>
            {props.children}
        </PriceContext.Provider>
      )
    }

