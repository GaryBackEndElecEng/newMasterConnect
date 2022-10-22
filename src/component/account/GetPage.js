import React,{useEffect,useContext} from 'react';
// import {GeneralContext} from '../../context/GeneralContextProvider';
import {TokenAccessContext} from '../../context/TokenAccessProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import apiProtect from '../axios/apiProtect';


const GetPage = () => {
    const { getProductList } = useContext(PriceContext);
    //SetUsersProduct=> FROM MyAccount ( it recieves all user's products and service)
    const { usersProduct, setUsersProduct, setReducedProduct,user_id } = useContext(TokenAccessContext);
    const getProductList2 = (localStorage.getItem("getProductList2")) ? JSON.parse(localStorage.getItem("getProductList2")) :getProductList.data;
    const reducedProduct1 = (localStorage.getItem("reducedProduct") ) ? JSON.parse(localStorage.getItem("reducedProduct")) : getProductList2;

    const addProductToUser = async (objID) => {
        const GetUser_id = localStorage.getItem("user_id") ? parseInt(localStorage.getItem("user_id")) : user_id;
        const params = { "user_id": GetUser_id, "prod_id": parseInt(objID) }
        if (user_id && objID) {
            try {
                const res = await apiProtect.post("/account/userProductPost/", params);
                const body = res.data;
                console.log(body)
                const reduceArray = reducedProduct1.filter(obj => (parseInt(obj.id) !== parseInt(objID)))
                let addToUserProductProduct = reducedProduct1.filter(obj => (parseInt(obj.id) !== parseInt(objID)))[0];
                setReducedProduct({ data: reduceArray, loaded: false })
                setUsersProduct({ data: [...usersProduct.data, addToUserProductProduct], loaded: true })
                localStorage.setItem("reducedProduct", JSON.stringify(reduceArray));
                localStorage.setItem("usersProduct", JSON.stringify([...usersProduct.data, addToUserProductProduct]));
            } catch (error) {
                console.error(error.message)
            }
        }
    }

    useEffect(() => {
        //THIS TAKES THE SELECTED PAGE FROM MEMORY, STORED BY SELECTION AND SAVED IT IN REDUCEDPRODUCTS
        // console.log(getProductPage)
        setTimeout(()=>{
            const getProductPage = localStorage.getItem("page") ? localStorage.getItem("page") : null;
            const getUsersProduct=localStorage.getItem("usersProduct") ? JSON.parse(localStorage.getItem("usersProduct")):null;
            if (getProductPage && reducedProduct1) {
                const productObj = reducedProduct1 ? reducedProduct1.filter(obj => (obj.extra_kwargs === getProductPage))[0] : null;
                // console.log(productObj)
                if(productObj){
                      addProductToUser(productObj.id);
                      localStorage.removeItem("page")
                      
                }else if(reducedProduct1){
                  setTimeout(()=>{
                      setReducedProduct({loaded:true,data:reducedProduct1})
                      localStorage.setItem("reducedProduct",JSON.stringify(reducedProduct1))
                  },0)  
              }
          
              }else if(!getUsersProduct){
                      setReducedProduct({loaded:true,data:getProductList2})
                      localStorage.setItem("reducedProduct",JSON.stringify(getProductList2)) 
              }
    
        },0);
        
      }, []);

  return (
    <></>
  )
}


export default GetPage